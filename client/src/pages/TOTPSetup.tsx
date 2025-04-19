"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLocation } from "wouter"
import { Helmet } from "react-helmet"
import { Copy, AlertTriangle } from "lucide-react"

export default function TOTPSetup() {
  const [totpSetup, setTotpSetup] = useState<{ secret: string; qrCode: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [, navigate] = useLocation()

  useEffect(() => {
    // Get TOTP setup data from localStorage
    const setupData = localStorage.getItem("totpSetup")

    if (!setupData) {
      // Redirect to registration if no TOTP setup data
      navigate("/auth")
      return
    }

    setTotpSetup(JSON.parse(setupData))

    // Clear TOTP setup data after 5 minutes for security
    const timer = setTimeout(
      () => {
        localStorage.removeItem("totpSetup")
        navigate("/auth")
      },
      5 * 60 * 1000,
    )

    return () => clearTimeout(timer)
  }, [navigate])

  const handleCopySecret = () => {
    if (totpSetup) {
      navigator.clipboard.writeText(totpSetup.secret)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleContinue = () => {
    // Clear TOTP setup data
    localStorage.removeItem("totpSetup")

    // Redirect to login
    navigate("/auth")
  }

  if (!totpSetup) {
    return null // Loading or redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
      <Helmet>
        <title>TOTP Setup - Prime Genesis</title>
      </Helmet>

      <Card className="w-full max-w-md bg-[#1E1E1E] border border-white border-opacity-5">
        <CardHeader>
          <CardTitle className="text-2xl">Two-Factor Authentication Setup</CardTitle>
          <CardDescription>Scan the QR code or enter the secret key in your authenticator app</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="bg-yellow-900/20 border-yellow-600 text-yellow-200">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>
              <strong>Important:</strong> This secret will only be shown once. If you lose it, you won't be able to
              recover your account.
            </AlertDescription>
          </Alert>

          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-lg">
              <img src={totpSetup.qrCode || "/placeholder.svg"} alt="TOTP QR Code" className="w-64 h-64" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Secret Key:</div>
            <div className="flex items-center">
              <code className="bg-[#121212] p-2 rounded flex-1 font-mono text-sm overflow-x-auto">
                {totpSetup.secret}
              </code>
              <Button variant="outline" size="sm" className="ml-2" onClick={handleCopySecret}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-400">Copied to clipboard!</p>}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
              <li>Download an authenticator app like Google Authenticator or Authy</li>
              <li>Scan the QR code or enter the secret key manually</li>
              <li>The app will generate a 6-digit code that changes every 30 seconds</li>
              <li>You'll need this code every time you log in</li>
            </ol>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" onClick={handleContinue}>
            I've saved my secret key
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
