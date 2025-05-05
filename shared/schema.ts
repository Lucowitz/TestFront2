import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // Add TOTP fields
  totpSecret: text("totp_secret"),
  totpEnabled: boolean("totp_enabled").default(false).notNull(),
  // Add user type field to distinguish between business and individual users
  userType: text("user_type").default("individual").notNull(),
})

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  userType: true,
})

// Schema for business users
export const businessUserSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  vatNumber: z.string().min(1, "VAT number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Schema for individual users
export const individualUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  fiscalCode: z.string().min(1, "Fiscal code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type InsertUser = z.infer<typeof insertUserSchema>
export type User = typeof users.$inferSelect
