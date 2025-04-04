import { Token } from "@/types/tokens";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from 'react';
import { useDemo } from "@/context/DemoContext";
import { Button } from "@/components/ui/button";

interface TokenCardProps {
  token: Token;
}

const TokenCard = ({ token }: TokenCardProps) => {
  const { t } = useLanguage();
  const { isDemoMode, demoUserType, purchaseToken, demoUserWallet } = useDemo(); // Assumed useDemo hook
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const handlePurchase = () => {
    const amount = Number(purchaseAmount);
    if (amount > 0) {
      const totalCost = amount * token.currentPrice;
      if (totalCost <= demoUserWallet.solanaBalance) {
        purchaseToken(token.id, amount);
        setShowPurchaseDialog(false);
        setPurchaseAmount("");
      }
    }
  };

  const sectorLabel = t(`tokens.sectors.${token.sector}`);

  return (
    <div className="token-card bg-[#2A2A2A] rounded-xl overflow-hidden border border-white border-opacity-5 hover:border-[#00FFD1] hover:border-opacity-30 transition-all duration-300">
      <div className="h-40 bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] relative">
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <img src={token.imageUrl} alt={token.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="bg-[#00FFD1] bg-opacity-90 text-[#121212] px-2 py-1 rounded text-xs font-medium">
            {sectorLabel}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-xl">{token.name}</h3>
          <div className="flex items-center bg-[#0047AB] bg-opacity-20 px-2 py-1 rounded">
            <span className="text-[#3373C4] font-mono text-sm font-medium">{token.symbol}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {token.description}
        </p>

        <div className="flex items-center justify-between text-sm mb-6">
          <div>
            <span className="text-gray-400 block">{t("tokens.card.marketcap")}</span>
            <span className="font-medium font-mono">{token.marketCap}</span>
          </div>
          <div>
            <span className="text-gray-400 block">{t("tokens.card.supply")}</span>
            <span className="font-medium font-mono">{token.supply}</span>
          </div>
          <div>
            <span className="text-gray-400 block">{t("tokens.card.price")}</span>
            <span className="font-medium font-mono">{token.price}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <a 
            href={`#token-detail-${token.id}`} 
            className="flex-1 px-4 py-2 bg-[#121212] text-center text-white rounded hover:bg-[#1E1E1E] transition-colors"
          >
            {t("tokens.card.details")}
          </a>
          {/* Button changed to open the purchase dialog */}
          <Button
            onClick={() => setShowPurchaseDialog(true)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00FFD1] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] text-center text-white rounded transition-all"
          >
            {t("tokens.card.buy")}
          </Button>

          {showPurchaseDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#1E1E1E] p-6 rounded-lg w-96">
                <h3 className="text-xl mb-4">Purchase {token.name}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Your balance: {demoUserWallet.solanaBalance} SOL</p>
                  <input
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    className="w-full p-2 bg-[#2A2A2A] rounded"
                    placeholder="Amount to purchase"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Cost: {(Number(purchaseAmount) * token.currentPrice).toFixed(2)} SOL
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePurchase} className="flex-1"> {/* Assumed Button component */}
                    Confirm
                  </Button>
                  <Button onClick={() => setShowPurchaseDialog(false)} variant="outline" className="flex-1"> {/* Assumed Button component */}
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCard;