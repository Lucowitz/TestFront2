import * as OTPAuth from "otpauth"
import QRCode from "qrcode"
import crypto from "crypto"

/**
 * Generate a new TOTP secret
 * @returns The generated secret
 */
export function generateSecret(): string {
  // Create a new Secret instance directly (correct for OTPAuth v9.x)
  const secret = new OTPAuth.Secret()

  // Generate a new TOTP object with the secret
  const totp = new OTPAuth.TOTP({
    issuer: "PrimeGenesis",
    label: "PrimeGenesis Portal",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret,
  })

  return secret.base32
}

/**
 * Generate a QR code for the TOTP secret
 * @param secret The TOTP secret
 * @param username The user's username or identifier
 * @returns A data URL containing the QR code
 */
export async function generateQRCode(secret: string, username: string): Promise<string> {
  const totp = new OTPAuth.TOTP({
    issuer: "PrimeGenesis",
    label: `PrimeGenesis:${username}`,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret,
  })

  // Get the TOTP URI
  const uri = totp.toString()

  // Generate a QR code for the URI
  return await QRCode.toDataURL(uri)
}

/**
 * Verify a TOTP code
 * @param secret The TOTP secret
 * @param code The code to verify
 * @returns Whether the code is valid
 */
export function verifyTOTP(secret: string, code: string): boolean {
  if (!secret || !code) {
    return false
  }

  try {
    const totp = new OTPAuth.TOTP({
      issuer: "PrimeGenesis",
      label: "PrimeGenesis Portal",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret,
    })

    // Verify the code with a window of 1 to allow for time drift
    // This means the code from the previous 30-second window will also be accepted
    return totp.validate({ token: code, window: 1 }) !== null
  } catch (error) {
    console.error("TOTP verification error:", error)
    return false
  }
}

/**
 * Encrypt a TOTP secret for secure storage
 * @param secret The TOTP secret to encrypt
 * @param encryptionKey The encryption key
 * @returns The encrypted secret
 */
export function encryptSecret(secret: string, encryptionKey: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv)
  let encrypted = cipher.update(secret)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString("hex") + ":" + encrypted.toString("hex")
}

/**
 * Decrypt a TOTP secret
 * @param encryptedSecret The encrypted TOTP secret
 * @param encryptionKey The encryption key
 * @returns The decrypted secret
 */
export function decryptSecret(encryptedSecret: string, encryptionKey: string): string {
  const textParts = encryptedSecret.split(":")
  const iv = Buffer.from(textParts[0], "hex")
  const encryptedText = Buffer.from(textParts[1], "hex")
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
