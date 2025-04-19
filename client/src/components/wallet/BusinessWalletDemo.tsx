"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowUpRight, ArrowDownLeft, RefreshCw, DollarSign, BarChart3 } from "lucide-react"

interface Transaction {
  id: string
  fromWalletId: string
  toWalletId: string
  amount: string
  tokenId: string
  timestamp: string
  status: string
}

interface BusinessWalletProps {
  companyId: string
  companyName: string
}

export default function BusinessWalletDemo({ companyId, companyName }: BusinessWalletProps) {
  const { toast } = useToast()
  const [balance, setBalance] = useState("0.00")
  const [tokenBalance, setTokenBalance] = useState("10000.00")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [recipientId, setRecipientId] = useState("")
  const [amount, setAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [activeTab, setActiveTab] = useState("sol")

  useEffect(() => {
    // In a real app, fetch wallet data from API
    // For demo, we'll use mock data
    const fetchWallet = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setBalance("500.75")
        setTransactions([
          {
            id: "tx1",
            fromWalletId: companyId,
            toWalletId: "user1",
            amount: "50.00",
            tokenId: "PGCF",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            status: "completed",
          },
          {
            id: "tx2",
            fromWalletId: "exchange",
            toWalletId: companyId,
            amount: "200.00",
            tokenId: "SOL",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            status: "completed",
          },
          {
            id: "tx3",
            fromWalletId: companyId,
            toWalletId: "user2",
            amount: "100.00",
            tokenId: "PGCF",
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            status: "completed",
          },
          {
            id: "tx4",
            fromWalletId: "user3",
            toWalletId: companyId,
            amount: "25.00",
            tokenId: "SOL",
            timestamp: new Date(Date.now() - 345600000).toISOString(),
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
  }, [companyId, toast])

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
      if (activeTab === "sol") {
        const newBalance = (Number.parseFloat(balance) - Number.parseFloat(amount)).toFixed(2)
        setBalance(newBalance)
      } else {
        const newTokenBalance = (Number.parseFloat(tokenBalance) - Number.parseFloat(tokenAmount)).toFixed(2)
        setTokenBalance(newTokenBalance)
      }

      // Add transaction to list
      const newTransaction = {
        id: `tx${Date.now()}`,
        fromWalletId: companyId,
        toWalletId: recipientId,
        amount: activeTab === "sol" ? amount : tokenAmount,
        tokenId: activeTab === "sol" ? "SOL" : "PGCF",
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      setTransactions([newTransaction, ...transactions])

      // Reset form
      setRecipientId("")
      setAmount("")
      setTokenAmount("")

      toast({
        title: "Success",
        description: `Sent ${activeTab === "sol" ? amount + " SOL" : tokenAmount + " PGCF"} to ${recipientId}`,
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
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#1E1E1E] border border-white border-opacity-5">
            <CardHeader>
              <CardTitle>Business Wallet</CardTitle>
              <CardDescription>Manage your company wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-xl">
                <div className="bg-[#121212] p-6 rounded-[calc(0.75rem-1px)]">
                  <div className="text-sm text-gray-400 mb-1">SOL Balance</div>
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-[#00FFD1] mr-2" />
                    <span className="text-3xl font-bold">{balance}</span>
                    <span className="ml-2 text-gray-400">SOL</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#00FFD1] to-[#0047AB] p-0.5 rounded-xl">
                <div className="bg-[#121212] p-6 rounded-[calc(0.75rem-1px)]">
                  <div className="text-sm text-gray-400 mb-1">Token Balance</div>
                  <div className="flex items-center">
                    <BarChart3 className="h-6 w-6 text-[#A45BF0] mr-2" />
                    <span className="text-3xl font-bold">{tokenBalance}</span>
                    <span className="ml-2 text-gray-400">PGCF</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">PrimeGen Coffee Token</div>
                </div>
              </div>

              <div className="text-xs text-gray-500">Company ID: {companyId}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border border-white border-opacity-5">
            <CardHeader>
              <CardTitle>Send Funds</CardTitle>
              <CardDescription>Transfer SOL or tokens to users</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sol" onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="sol" className="flex-1">
                    Send SOL
                  </TabsTrigger>
                  <TabsTrigger value="token" className="flex-1">
                    Send PGCF
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sol">
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
                </TabsContent>

                <TabsContent value="token">
                  <form onSubmit={handleSendTransaction} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenRecipientId">Recipient ID</Label>
                      <Input
                        id="tokenRecipientId"
                        placeholder="Enter recipient ID"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tokenAmount">Amount (PGCF)</Label>
                      <Input
                        id="tokenAmount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00FFD1] to-[#0047AB]"
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
                          Send PGCF
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2 bg-[#1E1E1E] border border-white border-opacity-5">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent activity in your business wallet</CardDescription>
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
                      {tx.toWalletId === companyId ? (
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
                            {tx.toWalletId === companyId ? "Received" : "Sent"} {tx.amount} {tx.tokenId}
                          </div>
                          <div className={tx.toWalletId === companyId ? "text-green-500" : "text-red-500"}>
                            {tx.toWalletId === companyId ? "+" : "-"}
                            {tx.amount}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <div>{tx.toWalletId === companyId ? `From: ${tx.fromWalletId}` : `To: ${tx.toWalletId}`}</div>
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
                {transactions.filter((tx) => tx.toWalletId === companyId).length > 0 ? (
                  transactions
                    .filter((tx) => tx.toWalletId === companyId)
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
                {transactions.filter((tx) => tx.fromWalletId === companyId).length > 0 ? (
                  transactions
                    .filter((tx) => tx.fromWalletId === companyId)
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
            <Button className="border border-white border-opacity-20" disabled={isLoading}>
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
