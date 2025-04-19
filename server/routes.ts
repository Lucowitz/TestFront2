import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import * as storage from "./storage";
import { nanoid } from "nanoid";
import crypto from "crypto";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { log } from "./vite";

// Create a test email transporter (for development)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "ethereal.user@ethereal.email", // placeholder - will be replaced in sendEmail function
    pass: "ethereal.password" // placeholder - will be replaced in sendEmail function
  }
});

// Helper function to send emails
async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Create a test account for development
    const testAccount = await nodemailer.createTestAccount();
    
    // Update transporter with test credentials
    transporter.auth.user = testAccount.user;
    transporter.auth.pass = testAccount.pass;
    
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Prime Genesis" <noreply@primegenesis.com>',
      to,
      subject,
      html
    });
    
    log(`Message sent: ${info.messageId}`, 'email');
    log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`, 'email');
    
    return { success: true, previewUrl: nodemailer.getTestMessageUrl(info) };
  } catch (error) {
    log(`Error sending email: ${error}`, 'email');
    return { success: false, error };
  }
}

// Helper function to generate TOTP secret
function generateTOTPSecret(label: string, issuer: string = 'Prime Genesis') {
  const secret = speakeasy.generateSecret({
    name: `${issuer}:${label}`
  });
  
  return secret;
}

// Helper function to verify TOTP token
function verifyTOTP(secret: string, token: string) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post('/api/register', async (req: Request, res: Response) => {
    try {
      const { isBusiness, ...userData } = req.body;
      
      if (!userData.email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
      
      if (!userData.password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
      }
      
      // Generate TOTP secret
      const label = isBusiness ? userData.name : `${userData.name} ${userData.surname}`;
      const totpSecret = generateTOTPSecret(label);
      
      let result;
      
      if (isBusiness) {
        // Register company
        if (!userData.name || !userData.vatNumber) {
          return res.status(400).json({ success: false, message: 'Company name and VAT number are required' });
        }
        
        result = storage.createCompany({
          name: userData.name,
          vatNumber: userData.vatNumber,
          email: userData.email,
          password: userData.password, // In production, hash this password
          totpSecret: totpSecret.base32
        });
      } else {
        // Register user
        if (!userData.name || !userData.surname || !userData.fiscalCode) {
          return res.status(400).json({ 
            success: false, 
            message: 'Name, surname, and fiscal code are required' 
          });
        }
        
        result = storage.createUser({
          name: userData.name,
          surname: userData.surname,
          address: userData.address || '',
          fiscalCode: userData.fiscalCode,
          phone: userData.phone || '',
          email: userData.email,
          password: userData.password, // In production, hash this password
          totpSecret: totpSecret.base32
        });
      }
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      // Generate QR code for TOTP
      const qrCodeUrl = await qrcode.toDataURL(totpSecret.otpauth_url);
      
      // Send welcome email
      const emailResult = await sendEmail(
        userData.email,
        'Welcome to Prime Genesis',
        `
        <h1>Welcome to Prime Genesis!</h1>
        <p>Thank you for registering with Prime Genesis. Your account has been created successfully.</p>
        <p>Please set up your two-factor authentication using the QR code provided during registration.</p>
        <p><strong>Important:</strong> Keep your TOTP secret safe. If you lose it, you won't be able to recover your account.</p>
        `
      );
      
      // Return success with TOTP setup info
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        totpSetup: {
          secret: totpSecret.base32,
          qrCode: qrCodeUrl
        },
        emailPreview: emailResult.previewUrl
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: String(error) });
    }
  });
  
  app.post('/api/login', (req: Request, res: Response) => {
    try {
      const { isBusiness, identifier, password, totpToken } = req.body;
      
      let user;
      
      if (isBusiness) {
        // Business login with VAT number
        user = storage.getCompanyByVatNumber(identifier);
      } else {
        // User login with fiscal code
        user = storage.getUserByFiscalCode(identifier);
      }
      
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      // Verify password (in production, compare hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      // Verify TOTP
      if (!verifyTOTP(user.totpSecret, totpToken)) {
        return res.status(401).json({ success: false, message: 'Invalid TOTP token' });
      }
      
      // Get wallet
      const wallet = storage.getWalletByOwnerId(user.id);
      
      // Create session token (in production, use JWT or similar)
      const sessionToken = nanoid();
      
      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type: isBusiness ? 'company' : 'user'
        },
        wallet: {
          id: wallet.id,
          balance: wallet.balance
        },
        token: sessionToken
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: String(error) });
    }
  });
  
  app.get('/api/wallet/:id', (req: Request, res: Response) => {
    try {
      const walletId = req.params.id;
      const wallet = storage.getWalletByOwnerId(walletId);
      
      if (!wallet) {
        return res.status(404).json({ success: false, message: 'Wallet not found' });
      }
      
      // Get transactions
      const transactions = storage.getTransactionsByWalletId(wallet.id);
      
      res.status(200).json({
        success: true,
        wallet: {
          id: wallet.id,
          balance: wallet.balance,
          ownerType: wallet.ownerType
        },
        transactions
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: String(error) });
    }
  });
  
  app.post('/api/transactions', (req: Request, res: Response) => {
    try {
      const { fromWalletId, toWalletId, amount, tokenId } = req.body;
      
      // Validate input
      if (!fromWalletId || !toWalletId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: 'From wallet, to wallet, and amount are required' 
        });
      }
      
      // Get wallets
      const fromWallet = storage.getWalletByOwnerId(fromWalletId);
      const toWallet = storage.getWalletByOwnerId(toWalletId);
      
      if (!fromWallet || !toWallet) {
        return res.status(404).json({ success: false, message: 'Wallet not found' });
      }
      
      // Check balance
      if (parseFloat(fromWallet.balance) < parseFloat(amount)) {
        return res.status(400).json({ success: false, message: 'Insufficient balance' });
      }
      
      // Update balances
      const newFromBalance = (parseFloat(fromWallet.balance) - parseFloat(amount)).toString();
      const newToBalance = (parseFloat(toWallet.balance) + parseFloat(amount)).toString();
      
      storage.updateWalletBalance(fromWallet.id, newFromBalance);
      storage.updateWalletBalance(toWallet.id, newToBalance);
      
      // Create transaction
      const transaction = storage.createTransaction({
        fromWalletId: fromWallet.id,
        toWalletId: toWallet.id,
        amount,
        tokenId
      });
      
      res.status(201).json({
        success: true,
        transaction,
        fromWallet: {
          id: fromWallet.id,
          balance: newFromBalance
        },
        toWallet: {
          id: toWallet.id,
          balance: newToBalance
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
