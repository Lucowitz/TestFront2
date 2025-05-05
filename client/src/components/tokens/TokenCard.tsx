"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { useDemo } from "@/context/DemoContext"
import type { Token } from "@/context/DemoContext" // Import the Token type

interface TokenCardProps {
  token: Token
}

const TokenCard = ({ token }: TokenCardProps) => {
  const { purchaseToken, demoUserWallet } = useDemo()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [amount, setAmount] = useState(1)
  const [error, setError] = useState("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (isNaN(value) || value < 1) {
      setAmount(1)
    } else {
      setAmount(value)
    }
  }

  const handlePurchase = () => {
    const totalCost = token.currentPrice * amount

    if (totalCost > demoUserWallet.balance) {
      setError("Saldo insufficiente per completare l'acquisto")
      return
    }

    purchaseToken(token.id, amount)
    setIsDialogOpen(false)
    setAmount(1)
    setError("")
  }

  // Calculate progress percentage
  const progressPercentage = (token.raisedAmount / token.targetRaise) * 100

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{token.name}</CardTitle>
            <CardDescription>{token.symbol}</CardDescription>
          </div>
          <Badge variant={token.type === "equity" ? "default" : token.type === "debt" ? "secondary" : "outline"}>
            {token.type === "equity" ? "Equity" : token.type === "debt" ? "Debt" : "Utility"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video bg-gray-200 rounded-md mb-4 overflow-hidden">
          <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-full h-full object-cover" />
        </div>
        <p className="text-sm mb-4 line-clamp-3">{token.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Prezzo</span>
            <span className="font-medium">{formatCurrency(token.currentPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Emittente</span>
            <span className="font-medium">{token.issuer}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Offerta Totale</span>
            <span className="font-medium">{token.totalSupply.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Investimento Min.</span>
            <span className="font-medium">{formatCurrency(token.minInvestment)}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{formatCurrency(token.raisedAmount)} raccolti</span>
            <span>{((token.raisedAmount / token.targetRaise) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Acquista Token</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Acquista {token.name}</DialogTitle>
              <DialogDescription>
                Inserisci la quantità di token che desideri acquistare. Il prezzo attuale è{" "}
                {formatCurrency(token.currentPrice)} per token.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Saldo disponibile:</span>
                  <span className="font-medium">{formatCurrency(demoUserWallet.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prezzo per token:</span>
                  <span className="font-medium">{formatCurrency(token.currentPrice)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="amount" className="text-sm font-medium">
                  Quantità
                </label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between font-medium">
                <span>Costo totale:</span>
                <span>{formatCurrency(token.currentPrice * amount)}</span>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handlePurchase}>Conferma Acquisto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default TokenCard

