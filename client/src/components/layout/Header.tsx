import { useState } from "react";
import { Link, useLocation } from "wouter";
import PrimeGenesisLogo from "@/assets/icons/PrimeGenesisLogo";
import { useLanguage } from "@/hooks/useLanguage";
import { useDemo } from "@/context/DemoContext";

const Button = ({ variant, size, onClick, children }) => {
  // Placeholder button component.  Replace with your actual Button component.
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded ${
        variant === "outline" ? "border border-gray-300" : "bg-blue-500 text-white"
      } ${size === "sm" ? "text-xs" : "text-sm"}`}
    >
      {children}
    </button>
  );
};


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { isDemoMode, demoUserType, toggleDemoMode } = useDemo(); // Assumed toggleDemoMode function

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = isDemoMode && demoUserType === "company"
    ? [
        { path: "/about", text: t("nav.about") },
        { path: "/services", text: t("nav.services") },
        { path: "/compliance", text: t("nav.compliance") },
      ]
    : [
        { path: "/about", text: t("nav.about") },
        { path: "/services", text: t("nav.services") },
        { path: "/token-explorer", text: t("nav.token-explorer") },
        { path: "/compliance", text: t("nav.compliance") },
        !isDemoMode && { path: "/demo", text: t("nav.demo") || "Demo" },
      ].filter(Boolean);

  const isActive = (path: string) => {
    return location === path ? "text-white" : "text-gray-300 hover:text-white";
  };

  const headerBgClass = isDemoMode
    ? demoUserType === "company"
      ? "bg-[#1a0f2e]"
      : "bg-[#0f1a2e]"
    : "bg-[#121212]";

  return (
    <header className={`fixed w-full ${headerBgClass} bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 border-b border-opacity-20 border-white`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <PrimeGenesisLogo />
              <span className="font-heading font-bold text-xl md:text-2xl text-white">Prime Genesis</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`${isActive(link.path)} font-medium transition-colors`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Buttons & Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <select
                className="appearance-none bg-transparent border border-secondary rounded-md px-2 py-1 text-sm font-medium text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "it")}
              >
                <option value="en">EN</option>
                <option value="it">IT</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="fill-current h-4 w-4 text-[#8A2BE2]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <Link
              href="/wallet"
              className="hidden md:inline-block px-4 py-2 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium text-sm transition-colors"
            >
              {t("nav.wallet")}
            </Link>

            {isDemoMode ? (
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#2A2A2A] rounded-md">
                <div className="text-sm text-gray-300">
                  Connected Demo Mode: {demoUserType === "company" ? "Company" : "User"}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleDemoMode();
                    // navigate("/");  //Requires 'navigate' function from 'wouter'
                  }}
                >
                  Exit Demo
                </Button>
              </div>
            ) : (
              <a
                href="/auth-page"
                className="hidden md:inline-block bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] px-5 py-2 rounded-md font-medium text-sm transition-all"
              >
                {t("nav.login")}
              </a>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-3 bg-[#1E1E1E] border-t border-white border-opacity-10">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="block text-gray-300 hover:text-white font-medium"
              onClick={closeMobileMenu}
            >
              {link.text}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
            <Link
              href="/wallet"
              className="px-4 py-2 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium text-sm transition-colors"
              onClick={closeMobileMenu}
            >
              {t("nav.wallet")}
            </Link>
            {isDemoMode ? (
              <button
                onClick={() => {
                  toggleDemoMode();
                  closeMobileMenu();
                }}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10 rounded-md font-medium text-sm transition-colors"
              >
                Exit Demo
              </button>
            ) : (
              <a
                href="/auth-page"
                className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] px-5 py-2 rounded-md font-medium text-sm transition-all"
                onClick={closeMobileMenu}
              >
                {t("nav.login")}
              </a>
            )}
            <select
              className="appearance-none bg-transparent border border-secondary rounded-md px-2 py-1 text-sm font-medium text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "it")}
            >
              <option value="en">EN</option>
              <option value="it">IT</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;