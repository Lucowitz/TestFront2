"use client"

import { useState } from "react"
import { useDemo } from "@/context/DemoContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { Token } from "@/context/DemoContext" // Import the Token type

const BusinessWalletDemo = () => {
  const { demoUserWallet } = useDemo()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for business wallet
  const businessBalance = 25000
  const tokensSold = 5000
  const totalRaised = 250000

  // Import tokens from data
  const tokens = require('../../data/tokens').default

  // Mock company token
  const companyToken: Token = {
    id: "company-token",
    name: "Company Token",
    symbol: "COMP",
    description: "Your company's security token",
    issuer: "Your Company",
    totalSupply: 10000,
    currentPrice: 50,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "equity",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minInvestment: 500,
    targetRaise: 500000,
    raisedAmount: 250000
  }

  // Mock investors
  const investors = [
    {
      id: 1,
      name: "Investor 1",
      amount: 2000,
      value: 100000,
      date: "2023-03-15"
    },
    {
      id: 2,
      name: "Investor 2",
      amount: 1500,
      value: 75000,
      date: "2023-04-10"
    },
    {
      id: 3,
      name: "Investor 3",
      amount: 1000,
      value: 50000,
      date: "2023-05-22"
    },
    {
      id: 4,
      name: "Investor 4",
      amount: 500,
      value: 25000,
      date: "2023-06-05"
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Aziendale</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo Disponibile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(businessBalance)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Token Venduti</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tokensSold.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">
              {((tokensSold / companyToken.totalSupply) * 100).toFixed(1)}% del totale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Capitale Raccolto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(totalRaised)}</p>
            <p className="text-sm text-muted-foreground">
              {((totalRaised / companyToken.targetRaise) * 100).toFixed(1)}% dell'obiettivo
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="token">Il Tuo Token</TabsTrigger>
          <TabsTrigger value="investors">Investitori</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo Raccolta</CardTitle>
              <CardDescription>Stato attuale della tua raccolta di capitale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                  <div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: `${(totalRaised / companyToken.targetRaise) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{formatCurrency(totalRaised)} raccolti</span>
                  <span>{formatCurrency(companyToken.targetRaise)} obiettivo</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Statistiche Token</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prezzo Attuale</span>
                        <span className="font-medium">{formatCurrency(companyToken.currentPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Offerta Totale</span>
                        <span className="font-medium">{companyToken.totalSupply.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Venduti</span>
                        <span className="font-medium">{tokensSold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Rimanenti</span>
                        <span className="font-medium">{(companyToken.totalSupply - tokensSold).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Dettagli Raccolta</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Inizio</span>
                        <span className="font-medium">{new Date(companyToken.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Fine</span>
                        <span className="font-medium">{new Date(companyToken.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investimento Minimo</span>
                        <span className="font-medium">{formatCurrency(companyToken.minInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Numero Investitori</span>
                        <span className="font-medium">{investors.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="token" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Il Tuo Token</CardTitle>
              <CardDescription>Dettagli del token emesso dalla tua azienda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={companyToken.image || "/placeholder.svg"}
                      alt={companyToken.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="mb-2" variant={companyToken.type === "equity" ? "default" : "secondary"}>
                    {companyToken.type === "equity" ? "Equity Token" : "Debt Token"}
                  </Badge>
                  <Badge variant={companyToken.status === "active" ? "outline" : "secondary"}>
                    {companyToken.status === "active" ? "Attivo" : "Completato"}
                  </Badge>
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">{companyToken.name}</h2>
                  <p className="text-muted-foreground mb-4">{companyToken.symbol}</p>
                  <p className="mb-6">{companyToken.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prezzo Attuale</p>
                      <p className="text-xl font-medium">{formatCurrency(companyToken.currentPrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Offerta Totale</p>
                      <p className="text-xl font-medium">{companyToken.totalSupply.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capitale Target</p>
                      <p className="text-xl font-medium">{formatCurrency(companyToken.targetRaise)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capitale Raccolto</p>
                      <p className="text-xl font-medium">{formatCurrency(companyToken.raisedAmount)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full">Modifica Token</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investitori</CardTitle>
              <CardDescription>Elenco degli investitori nel tuo token</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investors.map((investor) => (
                  <div key={investor.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{investor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(investor.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(investor.value)}</p>
                      <p className="text-sm text-muted-foreground">
                        {investor.amount} {companyToken.symbol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BusinessWalletDemo

