import fs from "fs"
import path from "path"
import crypto from "crypto"

/**
 * Simple storage utility for server-side data persistence
 */
export class Storage {
  private dataDir: string
  private encryptionKey: string

  /**
   * Create a new Storage instance
   * @param dataDir Directory to store data files
   * @param encryptionKey Key used for encrypting sensitive data
   */
  constructor(dataDir: string, encryptionKey: string) {
    this.dataDir = dataDir
    this.encryptionKey = encryptionKey

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
  }

  /**
   * Save data to a file
   * @param key The key (filename) to store the data under
   * @param data The data to store
   * @param encrypt Whether to encrypt the data
   */
  save<T>(key: string, data: T, encrypt = false): void {
    const filePath = path.join(this.dataDir, `${key}.json`)
    let stringData = JSON.stringify(data)

    if (encrypt) {
      stringData = this.encrypt(stringData)
    }

    fs.writeFileSync(filePath, stringData)
  }

  /**
   * Retrieve data from a file
   * @param key The key (filename) to retrieve data for
   * @param defaultValue Default value to return if key doesn't exist
   * @param encrypted Whether the data is encrypted
   * @returns The stored data or defaultValue if not found
   */
  get<T>(key: string, defaultValue: T, encrypted = false): T {
    const filePath = path.join(this.dataDir, `${key}.json`)

    if (!fs.existsSync(filePath)) {
      return defaultValue
    }

    try {
      let stringData = fs.readFileSync(filePath, "utf8")

      if (encrypted) {
        stringData = this.decrypt(stringData)
      }

      return JSON.parse(stringData) as T
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error)
      return defaultValue
    }
  }

  /**
   * Delete data for a key
   * @param key The key (filename) to delete
   */
  delete(key: string): void {
    const filePath = path.join(this.dataDir, `${key}.json`)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  /**
   * Check if data exists for a key
   * @param key The key (filename) to check
   * @returns Whether data exists for the key
   */
  exists(key: string): boolean {
    const filePath = path.join(this.dataDir, `${key}.json`)
    return fs.existsSync(filePath)
  }

  /**
   * Encrypt a string
   * @param text The text to encrypt
   * @returns The encrypted text
   */
  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(this.encryptionKey, "hex"), iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return `${iv.toString("hex")}:${encrypted}`
  }

  /**
   * Decrypt a string
   * @param text The text to decrypt
   * @returns The decrypted text
   */
  private decrypt(text: string): string {
    const [ivHex, encryptedText] = text.split(":")
    const iv = Buffer.from(ivHex, "hex")
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(this.encryptionKey, "hex"), iv)
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  }
}

// Export a singleton instance
export const storage = new Storage(
  path.join(process.cwd(), "data"),
  process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
)
