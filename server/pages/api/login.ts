import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { TOTP } from 'otpauth';
import { readFileSync } from 'fs';
import { join } from 'path';

//  Moved the user data to its own file.
const usersFilePath = join(process.cwd(), 'users.json');

// Helper function to read user data from the JSON file
function readUsers() {
    try {
        const fileContent = readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // Handle file not found or JSON parse errors
        console.error("Error reading user data:", error);
        return {}; // Return empty object to avoid crashing, handle error downstream
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { loginUsername, loginPassword, totpCode } = req.body;
    const users = readUsers(); // Read user data

    if (!users[loginUsername]) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    const user = users[loginUsername];
    const passwordMatch = await compare(loginPassword, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // TOTP Verification
    const totp = new TOTP({
        secret: user.totpSecret,
        algorithm: 'SHA1',
        digits: 6,
        step: 30, // 30-second window
    });

    const isValidTOTP = totp.validate({ token: totpCode, window: 1 });

    if (!isValidTOTP) {
        return res.status(401).json({ message: 'Invalid TOTP code' });
    }

    //  In a real app, you would create a session here.
    //  For this example, we'll just return a success message and a dummy redirect URL.
    //  The actual redirect should be handled by the client-side routing in Next.js.
    return res.status(200).json({
        message: 'Login successful',
        redirectUrl: '/dashboard', //  Replace with your actual dashboard URL
    });
}