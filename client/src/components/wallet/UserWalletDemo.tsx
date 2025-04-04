
import { useLanguage } from "@/hooks/useLanguage";
import { useDemo } from "@/context/DemoContext";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserWalletDemo() {
  const { t } = useLanguage();
  const { demoUserWallet, demoCompanyToken } = useDemo();
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<"SOL" | string>("SOL");

  const SOLANA_PRICE_USD = 102.45;
  const solanaValueUSD = demoUserWallet.solanaBalance * SOLANA_PRICE_USD;

  type PurchasedToken = { 
    tokenId: string; 
    amount: number; 
    purchaseValue: number; 
    currentValue: number; 
  };

  const totalTokenValueUSD = demoUserWallet.purchasedTokens.reduce(
    (acc: number, token: PurchasedToken) => acc + token.currentValue,
    0
  );
  const totalBalanceUSD = solanaValueUSD + totalTokenValueUSD;

  const handleSend = () => {
    const amount = Number(sendAmount);
    
    if (selectedToken === "SOL") {
      if (amount > 0 && amount <= demoUserWallet.solanaBalance) {
        alert(`Sent ${amount} SOL to ${recipientAddress}`);
        setShowSendDialog(false);
        setSendAmount("");
        setRecipientAddress("");
        setSelectedToken("SOL");
      } else {
        alert("Invalid amount or insufficient SOL balance");
      }
    } else {
      const token = demoUserWallet.purchasedTokens.find(t => t.tokenId === selectedToken);
      if (token && amount > 0 && amount <= token.amount) {
        alert(`Sent ${amount} ${demoCompanyToken?.symbol} to ${recipientAddress}`);
        setShowSendDialog(false);
        setSendAmount("");
        setRecipientAddress("");
        setSelectedToken("SOL");
      } else {
        alert("Invalid amount or insufficient token balance");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Wallet Demo - Prime Genesis</title>
        <meta name="description" content="Experience Prime Genesis wallet features in demo mode" />
      </Helmet>

      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1E1E1E] rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Total Balance</h2>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold font-heading mr-2">${totalBalanceUSD.toFixed(2)}</span>
                    <span className="text-[#00D395] text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      +12.5%
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-400 mb-1">Solana Balance</p>
                  <div className="flex items-center">
                    <span className="font-mono text-[#00FFD1] text-lg">{demoUserWallet.solanaBalance} SOL</span>
                    <span className="text-gray-400 ml-2">(${solanaValueUSD.toFixed(2)})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button 
                  onClick={() => setShowSendDialog(true)}
                  className="bg-[#2A2A2A] hover:bg-[#1E1E1E] transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </span>
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0]"
                  onClick={() => alert("Your receive address: demo123.solana")}
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    Receive
                  </span>
                </Button>
              </div>

              <div className="space-y-4">
                {demoUserWallet.purchasedTokens.map((token) => (
                  <div key={token.tokenId} className="p-4 bg-[#2A2A2A] rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] flex items-center justify-center mr-3">
                        <span className="text-white font-medium">
                          {demoCompanyToken?.symbol}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium">{demoCompanyToken?.name}</h5>
                        <span className="text-sm text-gray-400">{token.amount} tokens</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">${token.currentValue.toFixed(2)}</div>
                      <div className="text-sm text-gray-400">
                        Purchase value: ${token.purchaseValue.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}

                {demoUserWallet.purchasedTokens.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No tokens purchased yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSendDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">Send Assets</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Select Asset</label>
                <select 
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full p-2 bg-[#2A2A2A] rounded mt-1 text-white"
                >
                  <option value="SOL">SOL</option>
                  {demoUserWallet.purchasedTokens.map((token) => (
                    <option key={token.tokenId} value={token.tokenId}>
                      {demoCompanyToken?.symbol} ({token.amount} available)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full p-2 bg-[#2A2A2A] rounded mt-1"
                  placeholder="Enter recipient address"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">
                  Amount ({selectedToken === "SOL" ? "SOL" : demoCompanyToken?.symbol})
                </label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full p-2 bg-[#2A2A2A] rounded mt-1"
                  placeholder="Enter amount"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Available: {selectedToken === "SOL" 
                    ? `${demoUserWallet.solanaBalance} SOL`
                    : `${demoUserWallet.purchasedTokens.find(t => t.tokenId === selectedToken)?.amount || 0} ${demoCompanyToken?.symbol}`
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSend} className="flex-1">
                  Send
                </Button>
                <Button onClick={() => setShowSendDialog(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
