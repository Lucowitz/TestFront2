// Add this file to extend the express-session types

import "express-session"

declare module "express-session" {
  interface SessionData {
    pendingTOTPUserId?: number
    tempTOTPSecret?: string
  }
}
