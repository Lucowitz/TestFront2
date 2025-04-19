"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowUpRight, ArrowDownLeft, RefreshCw, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  fromWalletId: string
  toWalletId: string
  amount: string
  tokenId: string
  timestamp: string
  status: string
}

interface UserWalletProps {
  userId: string
  userName: string
}

export default function UserWalletDemo({ userId, userName }: UserWalletProps) {
  const { toast } = useToast()
  const [balance, setBalance] = useState("0.00")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [recipientId, setRecipientId] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {
    // In a real app, fetch wallet data from API
    // For demo, we'll use mock data
    const fetchWallet = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setBalance("125.50")
        setTransactions([
          {
            id: "tx1",
            fromWalletId: "other1",
            toWalletId: userId,
            amount: "50.00",
            tokenId: "SOL",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            status: "completed",
          },
          {
            id: "tx2",
            fromWalletId: userId,
            toWalletId: "other2",
            amount: "25.00",
            tokenId: "SOL",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            status: "completed",
          },
          {
            id: "tx3",
            fromWalletId: "other3",
            toWalletId: userId,
            amount: "100.00",
            tokenId: "SOL",
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            status: "completed",
          },
        ])
      } catch (error) {
        console.error("Error fetching wallet:", error)
        toast({
          title: "Error",
          description: "Failed to load wallet data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWallet()
  }, [userId, toast])

  const handleSendTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!recipientId || !amount) {
      toast({
        title: "Error",
        description: "Please enter recipient ID and amount",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate API call
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update balance
      const newBalance = (Number.parseFloat(balance) - Number.parseFloat(amount)).toFixed(2)
      setBalance(newBalance)

      // Add transaction to list
      const newTransaction = {
        id: `tx${Date.now()}`,
        fromWalletId: userId,
        toWalletId: recipientId,
        amount,
        tokenId: "SOL",
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      setTransactions([newTransaction, ...transactions])

      // Reset form
      setRecipientId("")
      setAmount("")

      toast({
        title: "Success",
        description: `Sent ${amount} SOL to ${recipientId}`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error sending transaction:", error)
      toast({
        title: "Error",
        description: "Failed to send transaction",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-[#1E1E1E] border border-white border-opacity-5">
          <CardHeader>
            <CardTitle>User Wallet</CardTitle>
            <CardDescription>Manage your personal wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-xl">
              <div className="bg-[#121212] p-6 rounded-[calc(0.75rem-1px)]">
                <div className="text-sm text-gray-400 mb-1">Current Balance</div>
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-[#00FFD1] mr-2" />
                  <span className="text-3xl font-bold">{balance}</span>
                  <span className="ml-2 text-gray-400">SOL</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">User ID: {userId}</div>
              </div>
            </div>

            <form onSubmit={handleSendTransaction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipientId">Recipient ID</Label>
                <Input
                  id="recipientId"
                  placeholder="Enter recipient ID"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (SOL)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Send SOL
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-[#1E1E1E] border border-white border-opacity-5">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent activity in your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center p-3 rounded-lg bg-[#121212] border border-white border-opacity-5"
                    >
                      {tx.toWalletId === userId ? (
                        <div className="h-10 w-10 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mr-3">
                          <ArrowDownLeft className="h-5 w-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-5 w-5 text-red-500" />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium">
                            {tx.toWalletId === userId ? "Received" : "Sent"} {tx.amount} {tx.tokenId}
                          </div>
                          <div className={tx.toWalletId === userId ? "text-green-500" : "text-red-500"}>
                            {tx.toWalletId === userId ? "+" : "-"}
                            {tx.amount}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <div>{tx.toWalletId === userId ? `From: ${tx.fromWalletId}` : `To: ${tx.toWalletId}`}</div>
                          <div>{formatDate(tx.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">No transactions found</div>
                )}
              </TabsContent>

              <TabsContent value="incoming" className="space-y-4">
                {transactions.filter((tx) => tx.toWalletId === userId).length > 0 ? (
                  transactions
                    .filter((tx) => tx.toWalletId === userId)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center p-3 rounded-lg bg-[#121212] border border-white border-opacity-5"
                      >
                        <div className="h-10 w-10 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mr-3">
                          <ArrowDownLeft className="h-5 w-5 text-green-500" />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium">
                              Received {tx.amount} {tx.tokenId}
                            </div>
                            <div className="text-green-500">+{tx.amount}</div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <div>From: {tx.fromWalletId}</div>
                            <div>{formatDate(tx.timestamp)}</div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-400">No incoming transactions found</div>
                )}
              </TabsContent>

              <TabsContent value="outgoing" className="space-y-4">
                {transactions.filter((tx) => tx.fromWalletId === userId).length > 0 ? (
                  transactions
                    .filter((tx) => tx.fromWalletId === userId)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center p-3 rounded-lg bg-[#121212] border border-white border-opacity-5"
                      >
                        <div className="h-10 w-10 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-5 w-5 text-red-500" />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium">
                              Sent {tx.amount} {tx.tokenId}
                            </div>
                            <div className="text-red-500">-{tx.amount}</div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <div>To: {tx.toWalletId}</div>
                            <div>{formatDate(tx.timestamp)}</div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-400">No outgoing transactions found</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
