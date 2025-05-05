"use client"
import { useAuth } from "@/context/AuthContext"
// Fix the import path to match your project structure
import { TOTPManagement } from "../components/auth/TOTPManagment" // Add .tsx extension
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"

export default function UserSettings() {
  const { user, isAuthenticated, logout } = useAuth()
  const [, navigate] = useLocation()

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/auth-page")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Impostazioni Account</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="security">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profilo</TabsTrigger>
            <TabsTrigger value="security">Sicurezza</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Profilo</CardTitle>
                <CardDescription>Visualizza e gestisci le informazioni del tuo profilo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-lg">{user?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tipo Account</p>
                    <p className="text-lg capitalize">{user?.userType === "business" ? "Business" : "Utente"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <TOTPManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
