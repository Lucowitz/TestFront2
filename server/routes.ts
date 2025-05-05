import type { Express, Request, Response } from 'express';
import express from 'express';
import { createServer, type Server } from 'http';
import bcrypt from 'bcrypt';
import otplib from 'otplib';
import jwt from 'jsonwebtoken';
import * as storage from './storage';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SESSION_EXPIRATION = parseInt(process.env.SESSION_EXPIRATION_SECONDS || '3600', 10);

const temporaryTotpSecrets = new Map<string, { secret: string; username: string; expires: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
    app.use(express.json());

    const sendErrorResponse = (res: Response, status: number, message: string) => {
        res.status(status).json({ message });
    };

    app.post('/api/register', async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return sendErrorResponse(res, 400, 'Username, email, and password are required');
        }

        try {
            const existingUser = await storage.findUserByUsername(username);
            if (existingUser) {
                return sendErrorResponse(res, 409, 'Username already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const totpSecret = otplib.authenticator.generateSecret();
            const temporaryId = uuidv4();
            const expires = Date.now() + 600000;

            await storage.saveNewUser({ username, email, hashedPassword, totpSecret: null, totpSetupVerified: false });
            temporaryTotpSecrets.set(temporaryId, { secret: totpSecret, username, expires });
            const qrCodeDataURL = await QRCode.toDataURL(
                `otpauth://totp/${encodeURIComponent(username)}?secret=${totpSecret}&issuer=YourWebApp`
            );
            res.json({
                temporaryId,
                secret: totpSecret,
                qrCode: qrCodeDataURL,
                message: "TOTP key generated. Please verify within 10 minutes.",
            });
        } catch (error) {
            console.error('Error saving user:', error);
            return sendErrorResponse(res, 500, 'Could not register user');
        }
    });

    app.post('/api/verify-totp-setup', async (req: Request, res: Response) => {
        const { temporaryId, totpCode } = req.body;
        const storedData = temporaryTotpSecrets.get(temporaryId);

        if (!storedData) {
            return sendErrorResponse(res, 400, 'Invalid or expired verification link.');
        }

        const { secret: storedSecret, username, expires } = storedData;

        if (Date.now() > expires) {
            temporaryTotpSecrets.delete(temporaryId);
            return sendErrorResponse(res, 400, 'Verification code expired.');
        }

        const isValidTotp = otplib.authenticator.verify({ token: totpCode, secret: storedSecret });

        if (isValidTotp) {
            try {
                const user = await storage.findUserByUsername(username);
                if (user) {
                    await storage.updateUserTotpSecret(username, storedSecret, true);
                    temporaryTotpSecrets.delete(temporaryId);
                    res.json({ message: 'TOTP setup successful.' });
                } else {
                    return sendErrorResponse(res, 404, 'User not found.');
                }
            } catch (error) {
                console.error('Error updating user:', error);
                return sendErrorResponse(res, 500, 'Could not update user');
            }
        } else {
            return sendErrorResponse(res, 400, 'Invalid TOTP code.');
        }
    });

    app.post('/api/login', async (req: Request, res: Response) => {
        const { username, password, totpCode } = req.body;

        if (!username || !password || !totpCode) {
            return sendErrorResponse(res, 400, 'Username, password and TOTP code are required');
        }

        try {
            const user = await storage.findUserByUsername(username);
            if (!user) {
                return sendErrorResponse(res, 401, 'Invalid credentials');
            }

            const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!passwordMatch) {
                return sendErrorResponse(res, 401, 'Invalid credentials');
            }

            if (!user.totpSecret || !user.totpSetupVerified) {
                return sendErrorResponse(res, 401, 'TOTP not configured');
            }

            const isValidTotp = otplib.authenticator.verify({ token: totpCode, secret: user.totpSecret });
            if (!isValidTotp) {
                return sendErrorResponse(res, 401, 'Invalid TOTP code');
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
                expiresIn: SESSION_EXPIRATION
            });
            res.json({ token, redirectUrl: '/protected-copy-of-website' });
        } catch (error) {
            console.error('Login error:', error);
            return sendErrorResponse(res, 500, 'Login failed');
        }
    });

    const httpServer = createServer(app);
    return httpServer;
}