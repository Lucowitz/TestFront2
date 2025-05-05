"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the type for the demo user type
export type DemoUserType = "user" | "company" | null

// Define the token type
export interface Token {
  id: string
  name: string
  symbol: string
  description: string
  issuer: string
  totalSupply: number
  currentPrice: number // Add this property
  image: string
  status: "active" | "pending" | "completed"
  type: "equity" | "debt" | "utility"
  startDate: string
  endDate: string
  minInvestment: number
  targetRaise: number
  raisedAmount: number
}

// Define the wallet type
export interface Wallet {
  balance: number
  tokens: {
    tokenId: string
    amount: number
    purchasePrice: number
    purchaseDate: string
  }[]
}

interface DemoContextType {
  isDemoMode: boolean
  toggleDemoMode: () => void
  demoUserType: DemoUserType
  setDemoUserType: (type: DemoUserType) => void
  // Add these properties
  demoUserWallet: Wallet
  demoCompanyToken: Token | null
  purchaseToken: (tokenId: string, amount: number) => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false)
  const [demoUserType, setDemoUserType] = useState<DemoUserType>("user") // Default to "user"
  
  // Initialize demo wallet
  const [demoUserWallet, setDemoUserWallet] = useState<Wallet>({
    balance: 10000, // Start with 10,000 currency units
    tokens: []
  })
  
  // Initialize demo company token
  const [demoCompanyToken, setDemoCompanyToken] = useState<Token | null>(null)

  // Load demo state from localStorage on mount
  useEffect(() => {
    const storedDemoMode = localStorage.getItem("isDemoMode")
    const storedUserType = localStorage.getItem("demoUserType") as DemoUserType
    const storedWallet = localStorage.getItem("demoUserWallet")
    const storedCompanyToken = localStorage.getItem("demoCompanyToken")

    if (storedDemoMode) {
      setIsDemoMode(storedDemoMode === "true")
    }

    if (storedUserType && (storedUserType === "user" || storedUserType === "company")) {
      setDemoUserType(storedUserType)
    }
    
    if (storedWallet) {
      try {
        setDemoUserWallet(JSON.parse(storedWallet))
      } catch (e) {
        console.error("Failed to parse stored wallet", e)
      }
    }
    
    if (storedCompanyToken) {
      try {
        setDemoCompanyToken(JSON.parse(storedCompanyToken))
      } catch (e) {
        console.error("Failed to parse stored company token", e)
      }
    }
  }, [])

  // Save demo state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isDemoMode", isDemoMode.toString())
    if (demoUserType) {
      localStorage.setItem("demoUserType", demoUserType)
    }
    localStorage.setItem("demoUserWallet", JSON.stringify(demoUserWallet))
    if (demoCompanyToken) {
      localStorage.setItem("demoCompanyToken", JSON.stringify(demoCompanyToken))
    }
  }, [isDemoMode, demoUserType, demoUserWallet, demoCompanyToken])

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode)
  }
  
  // Function to purchase a token
  const purchaseToken = (tokenId: string, amount: number) => {
    // Import tokens from data (this is a simplified version)
    const tokens = require('../data/tokens').default
    const token = tokens.find((t: Token) => t.id === tokenId)
    
    if (!token) return
    
    const cost = token.currentPrice * amount
    
    if (cost > demoUserWallet.balance) return
    
    // Update wallet
    setDemoUserWallet(prev => {
      // Check if token already exists in wallet
      const existingTokenIndex = prev.tokens.findIndex(t => t.tokenId === tokenId)
      
      let updatedTokens
      if (existingTokenIndex >= 0) {
        // Update existing token
        updatedTokens = [...prev.tokens]
        updatedTokens[existingTokenIndex] = {
          ...updatedTokens[existingTokenIndex],
          amount: updatedTokens[existingTokenIndex].amount + amount,
          purchasePrice: token.currentPrice,
          purchaseDate: new Date().toISOString()
        }
      } else {
        // Add new token
        updatedTokens = [
          ...prev.tokens,
          {
            tokenId,
            amount,
            purchasePrice: token.currentPrice,
            purchaseDate: new Date().toISOString()
          }
        ]
      }
      
      return {
        balance: prev.balance - cost,
        tokens: updatedTokens
      }
    })
  }

  const value = {
    isDemoMode,
    toggleDemoMode,
    demoUserType,
    setDemoUserType,
    demoUserWallet,
    demoCompanyToken,
    purchaseToken
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export const useDemo = () => {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider")
  }
  return context
}
