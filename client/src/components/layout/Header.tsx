"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { Menu, X, Globe, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [location] = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "it" : "en")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/token-explorer", label: t("nav.tokenExplorer") },
    { href: "/wallet", label: t("nav.wallet") },
    { href: "/compliance", label: t("nav.compliance") },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#121212]/90 backdrop-blur-md" : "bg-[#121212]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
                  Prime Genesis
                </span>
              </a>
            </Link>
          </div>

          <nav className="hidden md:flex md:space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-[#00FFD1] ${
                    location === link.href ? "text-[#00FFD1]" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={t("aria.toggleLanguage")}
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={t("aria.toggleTheme")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline">
                {t("nav.logout")}
              </Button>
            ) : (
              <Link href="/auth">
                <a>
                  <Button className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]">{t("nav.login")}</Button>
                </a>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm font-medium transition-colors hover:text-[#00FFD1] ${
                      location === link.href ? "text-[#00FFD1]" : "text-gray-300"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex space-x-4">
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={t("aria.toggleLanguage")}
                >
                  <Globe className="h-5 w-5" />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={t("aria.toggleTheme")}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>

              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" size="sm">
                  {t("nav.logout")}
                </Button>
              ) : (
                <Link href="/auth">
                  <a onClick={closeMenu}>
                    <Button className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" size="sm">
                      {t("nav.login")}
                    </Button>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
