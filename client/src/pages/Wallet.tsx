"use client"

import { useState, useEffect } from "react"
import { useLocation } from "wouter"
import { useDemo } from "@/context/DemoContext"
import UserWalletDemo from "@/components/wallet/UserWalletDemo"
import BusinessWalletDemo from "@/components/wallet/BusinessWalletDemo"
import { Helmet } from "react-helmet"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  type: string
}

export default function Wallet() {
  const [, navigate] = useLocation()
  const { isDemoMode, demoUserType } = useDemo()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    } else if (isDemoMode) {
      // In demo mode, create a mock user
      setUser({
        id: "demo-" + Date.now().toString(),
        name: demoUserType === "company" ? "Demo Company" : "Demo User",
        type: demoUserType || "user", // Provide default value
      })
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [isDemoMode, demoUserType])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <Loader2 className="h-8 w-8 animate-spin text-[#00FFD1]" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
        <Helmet>
          <title>Wallet - Prime Genesis</title>
        </Helmet>

        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold">Access Required</h1>
          <p className="text-gray-400">You need to log in or register to access your wallet.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]">
              Login / Register
            </Button>
            <Button onClick={() => navigate("/demo")} className="border border-white border-opacity-20">
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Helmet>
        <title>Wallet - Prime Genesis</title>
        <meta name="description" content="Manage your Prime Genesis wallet, view balance, and make transactions." />
      </Helmet>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Wallet</span>
            </h1>
            <p className="text-lg text-gray-300">
              {isDemoMode ? "Demo Mode: " : ""}
              Manage your funds and transactions in one place
            </p>
          </div>

          {user && user.type === "company" ? (
            <BusinessWalletDemo companyId={user.id} companyName={user.name} />
          ) : user ? (
            <UserWalletDemo userId={user.id} userName={user.name} />
          ) : null}
        </div>
      </section>
    </div>
  )
}
