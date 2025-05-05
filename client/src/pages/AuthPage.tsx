"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { TOTPVerify } from "@/components/auth/TOTPVerify"
import { useLocation } from "wouter"

interface InputProps {
  label: string
  type: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = ({ label, type, placeholder, required, value, onChange }: InputProps) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <Input type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} />
  </div>
)

const AuthPage = () => {
  const [isBusiness, setIsBusiness] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [showTOTPVerify, setShowTOTPVerify] = useState(false)
  const { login, register, requiresTOTP, isAuthenticated } = useAuth()
  const [, navigate] = useLocation()

  // Form states
  const [loginForm, setLoginForm] = useState({
    identifier: "", // P.IVA or Codice Fiscale
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    // Business fields
    companyName: "",
    vatNumber: "",
    email: "",
    // Individual fields
    firstName: "",
    lastName: "",
    address: "",
    fiscalCode: "",
    phoneNumber: "",
    // Common fields
    password: "",
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !requiresTOTP) {
      navigate("/")
    }
  }, [isAuthenticated, requiresTOTP, navigate])

  // Show TOTP verification if required
  useEffect(() => {
    if (requiresTOTP) {
      setShowTOTPVerify(true)
    }
  }, [requiresTOTP])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Use the identifier as username
    const result = await login(loginForm.identifier, loginForm.password)

    if (result.success && !result.requiresTOTP) {
      navigate("/")
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let userData

    if (isBusiness) {
      userData = {
        username: registerForm.vatNumber, // Use VAT number as username
        password: registerForm.password,
        userType: "business",
        companyName: registerForm.companyName,
        vatNumber: registerForm.vatNumber,
        email: registerForm.email,
      }
    } else {
      userData = {
        username: registerForm.fiscalCode, // Use fiscal code as username
        password: registerForm.password,
        userType: "individual",
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        address: registerForm.address,
        fiscalCode: registerForm.fiscalCode,
        phoneNumber: registerForm.phoneNumber,
      }
    }

    const success = await register(userData)

    if (success) {
      navigate("/")
    }
  }

  const handleTOTPVerified = () => {
    navigate("/")
  }

  // If TOTP verification is required, show the TOTP verification screen
  if (showTOTPVerify) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
        <TOTPVerify onVerified={handleTOTPVerified} onCancel={() => setShowTOTPVerify(false)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <button
            className={`text-lg font-semibold ${!isLogin ? "text-gray-400" : "text-white"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-semibold ${isLogin ? "text-gray-400" : "text-white"}`}
            onClick={() => setIsLogin(false)}
          >
            Registrati
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant={isBusiness ? "outline" : "default"} onClick={() => setIsBusiness(false)}>
            Utente
          </Button>
          <Button variant={isBusiness ? "default" : "outline"} onClick={() => setIsBusiness(true)}>
            Business
          </Button>
        </div>
        {isLogin ? (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <CustomInput
              label={isBusiness ? "P.IVA" : "Codice Fiscale"}
              type="text"
              placeholder={isBusiness ? "P.IVA" : "Codice Fiscale"}
              required
              value={loginForm.identifier}
              onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
            />
            <CustomInput
              label="Password"
              type="password"
              required
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <Button className="w-full" type="submit">
              Accedi
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            {isBusiness ? (
              <>
                <CustomInput
                  label="Nome Azienda"
                  type="text"
                  placeholder="Nome Azienda"
                  required
                  value={registerForm.companyName}
                  onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })}
                />
                <CustomInput
                  label="P.IVA"
                  type="text"
                  placeholder="Partita Iva"
                  required
                  value={registerForm.vatNumber}
                  onChange={(e) => setRegisterForm({ ...registerForm, vatNumber: e.target.value })}
                />
                <CustomInput
                  label="Email Commerciale"
                  type="email"
                  placeholder="Email Commerciale"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </>
            ) : (
              <>
                <CustomInput
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  required
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                />
                <CustomInput
                  label="Cognome"
                  type="text"
                  placeholder="Cognome"
                  required
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                />
                <CustomInput
                  label="Indirizzo"
                  type="text"
                  required
                  value={registerForm.address}
                  onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                />
                <CustomInput
                  label="Codice Fiscale"
                  type="text"
                  required
                  value={registerForm.fiscalCode}
                  onChange={(e) => setRegisterForm({ ...registerForm, fiscalCode: e.target.value })}
                />
                <CustomInput
                  label="Numero di Telefono"
                  type="text"
                  required
                  value={registerForm.phoneNumber}
                  onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })}
                />
              </>
            )}
            <CustomInput
              label="Password"
              type="password"
              placeholder="Password"
              required
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <Button className="w-full" type="submit">
              Registrati
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}

export default AuthPage
