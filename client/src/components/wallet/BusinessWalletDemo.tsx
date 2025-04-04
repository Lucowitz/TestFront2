
import { useLanguage } from "@/hooks/useLanguage";
import { useDemo } from "@/context/DemoContext";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Chart } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";

export default function BusinessWalletDemo() {
  const { t } = useLanguage();
  const { demoCompanyToken, demoUserWallet } = useDemo();
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");

  const SOLANA_PRICE_USD = 102.45;
  const solanaValueUSD = demoUserWallet.solanaBalance * SOLANA_PRICE_USD;
  const TRANSACTION_FEE_PERCENTAGE = 0.5; // 0.5% fee
  const accumulatedFees = {
    solana: 0.25, // Example accumulated fees
    tokens: 100
  };

  // Calculate token distribution
  const totalSupply = demoCompanyToken?.totalSupply || 0;
  const circulatingSupply = totalSupply * 0.85; // Example: 85% in circulation
  const companyHoldings = totalSupply - circulatingSupply;

  const chartData = {
    labels: ['Company Holdings', 'Circulating Supply'],
    datasets: [{
      data: [companyHoldings, circulatingSupply],
      backgroundColor: ['#0047AB', '#8A2BE2']
    }]
  };

  const handleCollectFees = () => {
    // In a real implementation, this would interact with the blockchain
    alert(`Collected fees: ${accumulatedFees.solana} SOL and ${accumulatedFees.tokens} ${demoCompanyToken?.symbol}`);
  };

  const handleBuyToken = () => {
    const amount = Number(buyAmount);
    if (amount > 0) {
      // In a real implementation, this would interact with the blockchain
      alert(`Bought ${amount} ${demoCompanyToken?.symbol} tokens`);
      setShowBuyDialog(false);
      setBuyAmount("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Wallet - Prime Genesis</title>
        <meta name="description" content="Manage your business tokens with Prime Genesis" />
      </Helmet>

      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1E1E1E] rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">{demoCompanyToken?.name}</h2>
                  <p className="text-gray-400">{demoCompanyToken?.symbol}</p>
                  <div className="mt-4">
                    <div className="font-mono text-xl">${demoCompanyToken?.currentValue}</div>
                    <div className="text-sm text-gray-400">
                      Market Cap: ${demoCompanyToken?.marketCap.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Solana Balance</h2>
                  <div className="font-mono text-xl">{demoUserWallet.solanaBalance} SOL</div>
                  <div className="text-sm text-gray-400">
                    ${solanaValueUSD.toFixed(2)} USD
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#2A2A2A] p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Token Supply</h3>
                  <p className="text-2xl font-mono">{demoCompanyToken?.totalSupply.toLocaleString()}</p>
                </div>
                <div className="bg-[#2A2A2A] p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Token Holders</h3>
                  <p className="text-2xl font-mono">{demoCompanyToken?.holders.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Token Distribution</h3>
                <div className="bg-[#2A2A2A] p-4 rounded-lg" style={{ height: '300px' }}>
                  <Chart type="pie" data={chartData} />
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-2">Transaction Fees</h3>
                <p className="text-sm text-gray-400 mb-2">Fee Rate: {TRANSACTION_FEE_PERCENTAGE}%</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Accumulated SOL</p>
                    <p className="font-mono">{accumulatedFees.solana} SOL</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Accumulated Tokens</p>
                    <p className="font-mono">{accumulatedFees.tokens} {demoCompanyToken?.symbol}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleCollectFees}
                  className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]"
                >
                  Collect Fees
                </Button>
                <Button 
                  onClick={() => setShowBuyDialog(true)}
                  className="bg-[#2A2A2A]"
                >
                  Buy Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBuyDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">Buy {demoCompanyToken?.symbol} Tokens</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Amount</label>
                <Input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="w-full"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleBuyToken} className="flex-1">
                  Buy
                </Button>
                <Button onClick={() => setShowBuyDialog(false)} variant="outline" className="flex-1">
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
