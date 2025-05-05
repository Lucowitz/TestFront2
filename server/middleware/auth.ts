import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { db } from "../db"
import { users } from "../../shared/schema"
import { eq } from "drizzle-orm"

// JWT secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Interface for the JWT payload
interface JwtPayload {
  userId: number
  username: string
  totpVerified?: boolean
}

// Extend Express Request interface to include user and totpVerified
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        username: string
      }
      totpVerified?: boolean
    }
  }
}

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload

    // Check if the user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId),
    })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Attach user info to the request
    req.user = {
      id: user.id,
      username: user.username,
    }

    // Check if TOTP verification is required and has been completed
    if (user.totpEnabled && !payload.totpVerified) {
      return res.status(403).json({
        message: "TOTP verification required",
        requiresTOTP: true,
      })
    }

    req.totpVerified = payload.totpVerified || false
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}

/**
 * Generate a JWT token
 */
export const generateToken = (userId: number, username: string, totpVerified = false): string => {
  const payload: JwtPayload = {
    userId,
    username,
    totpVerified,
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
}

/**
 * Middleware to check if TOTP is required but not yet verified
 */
export const requireTOTPVerification = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, req.user.id),
  })

  if (!user) {
    return res.status(401).json({ message: "User not found" })
  }

  if (user.totpEnabled && !req.totpVerified) {
    return res.status(403).json({
      message: "TOTP verification required",
      requiresTOTP: true,
    })
  }

  next()
}
