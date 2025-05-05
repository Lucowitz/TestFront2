"use client"

import { useState, useEffect } from "react"

// Define available languages
type Language = "it" | "en"

/**
 * Named export `useLanguage` so all your existing
 * `import { useLanguage } from "@/hooks/useLanguage";`
 * lines continue to work without change.
 */
export function useLanguage() {
  const [language, setLanguage] = useState<Language>("it")

  // Load saved preference
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null
    if (stored === "it" || stored === "en") {
      setLanguage(stored)
    }
  }, [])

  // Save on change
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return {
    language,
    changeLanguage,
    isItalian: language === "it",
    isEnglish: language === "en",
  }
}

// Optional default export (won’t break anything)
export default useLanguage
