import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { TOTP } from 'otpauth';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { toDataURL } from 'qrcode';
// import { sanitize } from 'dompurify';  // Not used

const usersFilePath = join(process.cwd(), 'users.json');

// Helper function to read user data
function readUsers() {
    try {
        const fileContent = readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // Handle file not found or JSON parse errors
        console.error("Error reading user data:", error);
        return {};
    }
}

// Helper function to write user data
function writeUsers(users: Record<string, any>) {
    try {
        const fileContent = JSON.stringify(users, null, 2);
        writeFileSync(usersFilePath, fileContent, 'utf-8');
    } catch (error) {
        console.error("Error writing user data:", error);
        throw new Error("Failed to write user data"); // Explicitly throw error
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password, ...rest } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Basic input validation (you should expand this)
    if (typeof username !== 'string' || username.trim() === "") {
        return res.status(400).json({ message: 'Invalid username' });
    }
    if (typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const users = readUsers(); // Load users

     if (users[username]) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const temporaryId = uuidv4();

    // Generate TOTP secret and URI
    const totpSecret = TOTP.generateSecret();
    const totp = new TOTP({
        secret: totpSecret,
        algorithm: 'SHA1',
        digits: 6,
        step: 30,
        issuer: 'YourAppName', // Replace with your app name
        label: username,       // Use username as label
    });
    const totpAuthURL = totp.toString();
    const qrCodeDataURL = await toDataURL(totpAuthURL);


    //  Important:  Don't store the actual secret in the database.
    //  Store a one-way hash of it, or even better, derive a key from it.
    //  For this example, we're storing the secret temporarily and marking totpSetupComplete = false
    //  The verify-totp-setup API will set it to true.
    users[username] = {
        password: hashedPassword,
        temporaryId: temporaryId,  // Store the temporary ID
        totpSecret: totpSecret,
        totpSetupComplete: false,
        ...rest, // Store other user details
    };

    try {
        writeUsers(users); // Save user data
    } catch (error) {
        return res.status(500).json({ message: 'Failed to save user data' });
    }


    return res.status(200).json({
        message: 'Registration successful.  Please complete TOTP setup.',
        temporaryId: temporaryId,
        secret: totpSecret,
        qrCode: qrCodeDataURL
    });
}