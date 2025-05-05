import type { Express } from "express"
import { createServer, type Server } from "http"
import { db } from "./db"
import { users } from "../shared/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"
import { generateSecret, generateQRCode, verifyTOTP, encryptSecret, decryptSecret } from "./auth/totp"
import { authenticateToken, generateToken, requireTOTPVerification } from "./middleware/auth"
import session from "express-session"
import cors from "cors"

// Extend express-session types directly in this file
declare module "express-session" {
  interface SessionData {
    pendingTOTPUserId?: number
    tempTOTPSecret?: string
  }
}

// Encryption key for TOTP secrets - should be in environment variables in production
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS
  app.use(
    cors({
      origin: process.env.NODE_ENV === "production" ? "https://yourproductiondomain.com" : "http://localhost:5000",
      credentials: true,
    }),
  )

  // Set up session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }),
  )

  // Authentication routes

  // Register a new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, userType } = req.body

      // Check if username already exists
      const existingUser = await db.query.users.findFirst({
        where: eq(users.username, username),
      })

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create the user
      const [newUser] = await db
        .insert(users)
        .values({
          username,
          password: hashedPassword,
          userType: userType || "individual",
        })
        .returning()

      // Generate a token (without TOTP verification)
      const token = generateToken(newUser.id, newUser.username)

      return res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          userType: newUser.userType,
          totpEnabled: newUser.totpEnabled,
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      return res.status(500).json({ message: "Failed to register user" })
    }
  })

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body

      // Find the user
      const user = await db.query.users.findFirst({
        where: eq(users.username, username),
      })

      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" })
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" })
      }

      // Check if TOTP is enabled
      if (user.totpEnabled) {
        // Store user ID in session for TOTP verification
        req.session.pendingTOTPUserId = user.id

        return res.status(200).json({
          message: "TOTP verification required",
          requiresTOTP: true,
          user: {
            id: user.id,
            username: user.username,
            userType: user.userType,
            totpEnabled: true,
          },
        })
      }

      // Generate token (without TOTP verification since it's not enabled)
      const token = generateToken(user.id, user.username, true)

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          userType: user.userType,
          totpEnabled: user.totpEnabled,
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      return res.status(500).json({ message: "Failed to login" })
    }
  })

  // TOTP verification during login
  app.post("/api/auth/totp/verify-login", async (req, res) => {
    try {
      const { code } = req.body
      const userId = req.session.pendingTOTPUserId

      if (!userId) {
        return res.status(400).json({ message: "No pending TOTP verification" })
      }

      // Get the user
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      })

      if (!user || !user.totpSecret) {
        return res.status(400).json({ message: "User not found or TOTP not enabled" })
      }

      // Decrypt the TOTP secret
      const decryptedSecret = decryptSecret(user.totpSecret, ENCRYPTION_KEY)

      // Verify the TOTP code
      const isValid = verifyTOTP(decryptedSecret, code)

      if (!isValid) {
        return res.status(400).json({ message: "Invalid verification code" })
      }

      // Clear the pending TOTP user ID
      delete req.session.pendingTOTPUserId

      // Generate token with TOTP verification
      const token = generateToken(user.id, user.username, true)

      return res.status(200).json({
        message: "TOTP verification successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          userType: user.userType,
          totpEnabled: true,
        },
      })
    } catch (error) {
      console.error("TOTP verification error:", error)
      return res.status(500).json({ message: "Failed to verify TOTP" })
    }
  })

  // TOTP setup
  app.post("/api/auth/totp/setup", authenticateToken, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" })
      }

      // Generate a new TOTP secret
      const secret = generateSecret()

      // Generate a QR code
      const qrCode = await generateQRCode(secret, req.user.username)

      // Store the secret temporarily in the session
      req.session.tempTOTPSecret = secret

      return res.status(200).json({
        message: "TOTP setup initiated",
        qrCode,
        secret,
      })
    } catch (error) {
      console.error("TOTP setup error:", error)
      return res.status(500).json({ message: "Failed to set up TOTP" })
    }
  })

  // TOTP verification during setup
  app.post("/api/auth/totp/verify-setup", authenticateToken, async (req, res) => {
    try {
      const { code } = req.body
      const secret = req.session.tempTOTPSecret

      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" })
      }

      if (!secret) {
        return res.status(400).json({ message: "TOTP setup not initiated" })
      }

      // Verify the TOTP code
      const isValid = verifyTOTP(secret, code)

      if (!isValid) {
        return res.status(400).json({ message: "Invalid verification code" })
      }

      // Encrypt the secret for storage
      const encryptedSecret = encryptSecret(secret, ENCRYPTION_KEY)

      // Save the secret to the user's record
      await db
        .update(users)
        .set({
          totpSecret: encryptedSecret,
          totpEnabled: true,
        })
        .where(eq(users.id, req.user.id))

      // Clear the temporary secret
      delete req.session.tempTOTPSecret

      // Generate a new token with TOTP verification
      const token = generateToken(req.user.id, req.user.username, true)

      return res.status(200).json({
        message: "TOTP enabled successfully",
        token,
      })
    } catch (error) {
      console.error("TOTP verification error:", error)
      return res.status(500).json({ message: "Failed to verify TOTP" })
    }
  })

  // TOTP status
  app.get("/api/auth/totp/status", authenticateToken, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" })
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, req.user.id),
      })

      return res.status(200).json({
        enabled: user?.totpEnabled || false,
      })
    } catch (error) {
      console.error("TOTP status error:", error)
      return res.status(500).json({ message: "Failed to check TOTP status" })
    }
  })

  // TOTP disable
  app.post("/api/auth/totp/disable", authenticateToken, requireTOTPVerification, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" })
      }

      // Disable TOTP for the user
      await db
        .update(users)
        .set({
          totpSecret: null,
          totpEnabled: false,
        })
        .where(eq(users.id, req.user.id))

      return res.status(200).json({
        message: "TOTP disabled successfully",
      })
    } catch (error) {
      console.error("TOTP disable error:", error)
      return res.status(500).json({ message: "Failed to disable TOTP" })
    }
  })

  // User profile
  app.get("/api/user/profile", authenticateToken, requireTOTPVerification, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" })
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, req.user.id),
      })

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      return res.status(200).json({
        id: user.id,
        username: user.username,
        userType: user.userType,
        totpEnabled: user.totpEnabled,
      })
    } catch (error) {
      console.error("Profile error:", error)
      return res.status(500).json({ message: "Failed to fetch profile" })
    }
  })

  const httpServer = createServer(app)
  return httpServer
}
