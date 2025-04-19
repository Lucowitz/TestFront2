"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/home/HeroSection"
import AboutSection from "@/components/home/AboutSection"
import ServicesSection from "@/components/home/ServicesSection"
import TokenExplorerSection from "@/components/home/TokenExplorerSection"
import WalletSection from "@/components/home/WalletSection"
import ComplianceSection from "@/components/home/ComplianceSection"
import CTASection from "@/components/home/CTASection"
import { Helmet } from "react-helmet"
import { useLanguage } from "@/hooks/useLanguage"
import UserWalletDemo from "@/components/wallet/UserWalletDemo"
import BusinessWalletDemo from "@/components/wallet/BusinessWalletDemo"

interface User {
  id: string
  name: string
  type: string
}

export default function Home() {
  const { t } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Prime Genesis - Custom Token Creation & Wallet Management</title>
        <meta
          name="description"
          content="Prime Genesis creates custom tokens on Solana for businesses and offers simplified wallet management. EU MiCA compliant crypto solutions for every business."
        />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TokenExplorerSection />

      {isAuthenticated ? (
        <section className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Your{" "}
                <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
                  Wallet
                </span>
              </h2>
              <p className="text-lg text-gray-300">Manage your funds and transactions in one place</p>
            </div>

            {user &&
              (user.type === "company" ? (
                <BusinessWalletDemo companyId={user.id} companyName={user.name} />
              ) : (
                <UserWalletDemo userId={user.id} userName={user.name} />
              ))}
          </div>
        </section>
      ) : (
        <WalletSection />
      )}

      <ComplianceSection />
      <CTASection />
    </>
  )
}
