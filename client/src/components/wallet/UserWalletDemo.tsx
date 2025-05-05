"use client"

import { useState } from "react"
import { useDemo } from "@/context/DemoContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { Token } from "@/context/DemoContext" // Import the Token type

const UserWalletDemo = () => {
  const { demoUserWallet, demoCompanyToken } = useDemo()
  const [activeTab, setActiveTab] = useState("overview")

  // Import tokens from data
  const tokens = require('../../data/tokens').default

  // Get tokens owned by the user
  const userTokens = demoUserWallet.tokens.map((t) => {
    const tokenDetails = tokens.find((token: Token) => token.id === t.tokenId)
    return {
      ...tokenDetails,
      owned: t.amount,
      purchasePrice: t.purchasePrice,
      purchaseDate: t.purchaseDate,
      currentValue: tokenDetails ? tokenDetails.currentPrice * t.amount : 0,
    }
  })

  // Calculate total portfolio value
  const portfolioValue = userTokens.reduce((total, token) => total + token.currentValue, 0)

  // Calculate total profit/loss
  const totalProfitLoss = userTokens.reduce(
    (total, token) => total + (token.currentPrice - token.purchasePrice) * token.owned,
    0
  )

  // Calculate profit/loss percentage
  const totalInvested = userTokens.reduce((total, token) => total + token.purchasePrice * token.owned, 0)
  const profitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Il Tuo Portafoglio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo Disponibile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(demoUserWallet.balance)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Valore Portafoglio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(portfolioValue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profitto/Perdita</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-3xl font-bold ${
                totalProfitLoss > 0 ? "text-green-500" : totalProfitLoss < 0 ? "text-red-500" : ""
              }`}
            >
              {formatCurrency(totalProfitLoss)} ({profitLossPercentage.toFixed(2)}%)
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="tokens">I Tuoi Token</TabsTrigger>
          <TabsTrigger value="transactions">Transazioni</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo Portafoglio</CardTitle>
              <CardDescription>Una panoramica dei tuoi investimenti</CardDescription>
            </CardHeader>
            <CardContent>
              {userTokens.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Non hai ancora token nel tuo portafoglio</p>
                  <Button onClick={() => setActiveTab("tokens")}>Esplora Token</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Allocazione</h3>
                      <div className="space-y-2">
                        {userTokens.map((token: any) => (
                          <div key={token.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                                <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-full h-full object-cover" />
                              </div>
                              <span>{token.symbol}</span>
                            </div>
                            <div className="text-right">
                              <p>{((token.currentValue / portfolioValue) * 100).toFixed(1)}%</p>
                              <p className="text-sm text-muted-foreground">{formatCurrency(token.currentValue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Performance</h3>
                      <div className="space-y-2">
                        {userTokens.map((token: any) => {
                          const tokenProfitLoss = (token.currentPrice - token.purchasePrice) * token.owned
                          const tokenProfitLossPercentage = (token.currentPrice / token.purchasePrice - 1) * 100
                          return (
                            <div key={token.id} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                                  <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-full h-full object-cover" />
                                </div>
                                <span>{token.symbol}</span>
                              </div>
                              <div className="text-right">
                                <p
                                  className={
                                    tokenProfitLoss > 0
                                      ? "text-green-500"
                                      : tokenProfitLoss < 0
                                      ? "text-red-500"
                                      : ""
                                  }
                                >
                                  {tokenProfitLossPercentage > 0 ? "+" : ""}
                                  {tokenProfitLossPercentage.toFixed(2)}%
                                </p>
                                <p
                                  className={`text-sm ${
                                    tokenProfitLoss > 0
                                      ? "text-green-500"
                                      : tokenProfitLoss < 0
                                      ? "text-red-500"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {formatCurrency(tokenProfitLoss)}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>I Tuoi Token</CardTitle>
              <CardDescription>Token che possiedi nel tuo portafoglio</CardDescription>
            </CardHeader>
            <CardContent>
              {userTokens.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Non hai ancora token nel tuo portafoglio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userTokens.map((token: any) => {
                    const profitLoss = (token.currentPrice - token.purchasePrice) * token.owned
                    const profitLossPercentage = (token.currentPrice / token.purchasePrice - 1) * 100
                    return (
                      <div key={token.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                              <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-medium">{token.name}</h3>
                              <p className="text-sm text-muted-foreground">{token.symbol}</p>
                            </div>
                          </div>
                          <Badge variant={token.type === "equity" ? "default" : token.type === "debt" ? "secondary" : "outline"}>
                            {token.type === "equity" ? "Equity" : token.type === "debt" ? "Debt" : "Utility"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Quantità</p>
                            <p className="font-medium">{token.owned}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Prezzo Attuale</p>
                            <p className="font-medium">{formatCurrency(token.currentPrice)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Valore</p>
                            <p className="font-medium">{formatCurrency(token.currentValue)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Profitto/Perdita</p>
                            <p
                              className={`font-medium ${
                                profitLoss > 0 ? "text-green-500" : profitLoss < 0 ? "text-red-500" : ""
                              }`}
                            >
                              {formatCurrency(profitLoss)} ({profitLossPercentage > 0 ? "+" : ""}
                              {profitLossPercentage.toFixed(2)}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transazioni</CardTitle>
              <CardDescription>Storico delle tue transazioni</CardDescription>
            </CardHeader>
            <CardContent>
              {userTokens.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Non hai ancora effettuato transazioni</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userTokens.map((t: any) => {
                    const date = new Date(t.purchaseDate)
                    return (
                      <div key={t.id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <p className="font-medium">Acquisto {t.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {date.toLocaleDateString()} {date.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(t.purchasePrice * t.owned)}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.owned} {t.symbol} @ {formatCurrency(t.purchasePrice)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserWalletDemo

