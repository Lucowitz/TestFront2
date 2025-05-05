"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import { useDemo } from "@/context/DemoContext"
import { useAuth } from "@/context/AuthContext"

// Add proper type definitions for the HeaderButton props
interface HeaderButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  children: React.ReactNode
}

// Use the interface for the HeaderButton component
const HeaderButton = ({ variant = "ghost", size = "default", onClick, children }: HeaderButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${
        variant === "ghost" ? "hover:bg-gray-700" : "bg-primary hover:bg-primary/90"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location] = useLocation()
  const { isDemoMode, toggleDemoMode, demoUserType, setDemoUserType } = useDemo()
  const { isAuthenticated, user, logout } = useAuth()

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    // Optionally redirect to home page
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212] text-white border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            PrimeGenesis
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/token-explorer" className="hover:text-primary transition-colors">
              Token Explorer
            </Link>
            <Link href="/wallet" className="hover:text-primary transition-colors">
              Wallet
            </Link>
            <Link href="/compliance" className="hover:text-primary transition-colors">
              Compliance
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>

            {/* Demo Mode Toggle */}
            <div className="ml-4 flex items-center">
              <span className="mr-2 text-sm">Demo:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isDemoMode} onChange={toggleDemoMode} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* User Type Selection (only visible in demo mode) */}
            {isDemoMode && (
              <div className="flex items-center space-x-2">
                <button
                  className={`px-2 py-1 text-xs rounded ${
                    demoUserType === "user" ? "bg-primary" : "bg-gray-700"
                  }`}
                  onClick={() => setDemoUserType("user")}
                >
                  Individual
                </button>
                <button
                  className={`px-2 py-1 text-xs rounded ${demoUserType === "company" ? "bg-primary" : "bg-gray-700"}`}
                  onClick={() => setDemoUserType("company")}
                >
                  Company
                </button>
              </div>
            )}

            {/* Authentication Links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/settings" className="hover:text-primary transition-colors">
                  Settings
                </Link>
                <HeaderButton onClick={handleLogout}>Logout</HeaderButton>
              </div>
            ) : (
              <Link href="/auth-page">
                <HeaderButton>Login</HeaderButton>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#121212] border-t border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link href="/token-explorer" className="py-2 hover:text-primary transition-colors">
                Token Explorer
              </Link>
              <Link href="/wallet" className="py-2 hover:text-primary transition-colors">
                Wallet
              </Link>
              <Link href="/compliance" className="py-2 hover:text-primary transition-colors">
                Compliance
              </Link>
              <Link href="/about" className="py-2 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/services" className="py-2 hover:text-primary transition-colors">
                Services
              </Link>

              {/* Demo Mode Toggle */}
              <div className="py-2 flex items-center">
                <span className="mr-2">Demo Mode:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isDemoMode} onChange={toggleDemoMode} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              {/* User Type Selection (only visible in demo mode) */}
              {isDemoMode && (
                <div className="py-2 flex items-center space-x-2">
                  <span>User Type:</span>
                  <button
                    className={`px-2 py-1 text-xs rounded ${
                      demoUserType === "user" ? "bg-primary" : "bg-gray-700"
                    }`}
                    onClick={() => setDemoUserType("user")}
                  >
                    Individual
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded ${demoUserType === "company" ? "bg-primary" : "bg-gray-700"}`}
                    onClick={() => setDemoUserType("company")}
                  >
                    Company
                  </button>
                </div>
              )}

              {/* Authentication Links */}
              {isAuthenticated ? (
                <>
                  <Link href="/settings" className="py-2 hover:text-primary transition-colors">
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="py-2 text-left hover:text-primary transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth-page" className="py-2 hover:text-primary transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header

