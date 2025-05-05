"use client"

// Rename this file to avoid conflict with the existing useLanguage
// This is a placeholder implementation - you should integrate with your actual language system

import { useState, useEffect } from "react"

// Define available languages
type Language = "it" | "en"

// Define a custom hook for language management
export const useLanguageHook = () => {
  const [language, setLanguage] = useState<Language>("it")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "it" || storedLanguage === "en")) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Function to change language
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
