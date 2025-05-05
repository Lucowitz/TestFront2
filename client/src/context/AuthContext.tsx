"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: number
  username: string
  userType: string
  totpEnabled: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  requiresTOTP: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; requiresTOTP?: boolean }>
  verifyTOTP: (code: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  setupTOTP: () => Promise<{ success: boolean; qrCode?: string; secret?: string }>
  verifyTOTPSetup: (code: string) => Promise<boolean>
  disableTOTP: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [requiresTOTP, setRequiresToTP] = useState<boolean>(false)
  const { toast } = useToast()

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    const storedUser = localStorage.getItem("authUser")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Check if TOTP verification is required
      if (data.requiresTOTP) {
        setRequiresToTP(true)
        setUser(data.user)
        return { success: true, requiresTOTP: true }
      }

      // Store auth data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("authUser", JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      setRequiresToTP(false)

      return { success: true }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      })
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  const verifyTOTP = async (code: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/totp/verify-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "TOTP verification failed")
      }

      // Store auth data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("authUser", JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      setRequiresToTP(false)

      return true
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Store auth data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("authUser", JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)

      return true
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("authUser")
    setToken(null)
    setUser(null)
    setRequiresToTP(false)
  }

  const setupTOTP = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/totp/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to set up TOTP")
      }

      return {
        success: true,
        qrCode: data.qrCode,
        secret: data.secret,
      }
    } catch (error) {
      toast({
        title: "TOTP Setup Failed",
        description: error instanceof Error ? error.message : "Failed to set up two-factor authentication",
        variant: "destructive",
      })
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  const verifyTOTPSetup = async (code: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/totp/verify-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify TOTP")
      }

      // Update token and user
      localStorage.setItem("authToken", data.token)
      setToken(data.token)

      // Update user with TOTP enabled
      if (user) {
        const updatedUser = { ...user, totpEnabled: true }
        localStorage.setItem("authUser", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      return true
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const disableTOTP = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/totp/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to disable TOTP")
      }

      // Update user with TOTP disabled
      if (user) {
        const updatedUser = { ...user, totpEnabled: false }
        localStorage.setItem("authUser", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      return true
    } catch (error) {
      toast({
        title: "Failed to Disable 2FA",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    requiresTOTP,
    login,
    verifyTOTP,
    register,
    logout,
    setupTOTP,
    verifyTOTPSetup,
    disableTOTP,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
