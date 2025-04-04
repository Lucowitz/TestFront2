import { createContext, useState, useContext, ReactNode } from "react";

// Demo token example for companies
export interface DemoCompanyToken {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  initialValue: number;
  currentValue: number;
  holders: number;
  marketCap: number;
  creationDate: string;
  description: string;
  logoUrl: string;
}

// Demo user wallet information
export interface DemoUserWallet {
  solanaBalance: number;
  purchasedTokens: {
    tokenId: string;
    amount: number;
    purchaseValue: number;
    currentValue: number;
  }[];
}

// Demo transaction
export interface DemoTransaction {
  id: string;
  type: "purchase" | "sale" | "payment" | "reward";
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  amount: number;
  value: number;
  timestamp: string;
  status: "completed" | "pending" | "cancelled";
  merchant?: string;
  description?: string;
  recipientWallet?: string;
}

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  demoUserType: "company" | "user" | null;
  setDemoUserType: (type: "company" | "user" | null) => void;
  demoCompanyToken: DemoCompanyToken | null;
  demoUserWallet: DemoUserWallet;
  demoTransactions: DemoTransaction[];
  lastPurchaseNotification: { tokenName: string; amount: number } | null;
  // Functions for the demo
  purchaseToken: (tokenId: string, amount: number) => void;
  sellToken: (tokenId: string, amount: number) => void;
  approveTransaction: (transactionId: string) => void;
  rejectTransaction: (transactionId: string) => void;
  addPendingTransaction: (tokenId: string, amount: number, merchant: string, description: string) => void;
  rewardWallet: (recipientWallet: string, amount: number) => void;
  clearPurchaseNotification: () => void;
}

// Example company token
const DEMO_COMPANY_TOKEN: DemoCompanyToken = {
  id: "prime-genesis-demo-token",
  name: "PrimeGen Coffee",
  symbol: "PGCF",
  totalSupply: 100000,
  initialValue: 0.05,
  currentValue: 0.12,
  holders: 427,
  marketCap: 12000,
  creationDate: "2024-01-15",
  description: "Token for a premium coffee chain allowing customers to purchase coffee and earn rewards through blockchain technology.",
  logoUrl: "/coffee-token-logo.svg",
};

// Initial demo wallet with 5 SOL
const INITIAL_WALLET: DemoUserWallet = {
  solanaBalance: 5,
  purchasedTokens: []
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoUserType, setDemoUserType] = useState<"company" | "user" | null>(null);
  const [demoCompanyToken, setDemoCompanyToken] = useState<DemoCompanyToken | null>(null);
  const [demoUserWallet, setDemoUserWallet] = useState<DemoUserWallet>(INITIAL_WALLET);
  const [demoTransactions, setDemoTransactions] = useState<DemoTransaction[]>([]);
  const [lastPurchaseNotification, setLastPurchaseNotification] = useState<{ tokenName: string; amount: number } | null>(null);

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      setDemoCompanyToken(DEMO_COMPANY_TOKEN);
      setDemoUserWallet(INITIAL_WALLET);
      setDemoTransactions([]);
    } else {
      setDemoUserType(null);
      setLastPurchaseNotification(null);
    }
  };

  const purchaseToken = (tokenId: string, amount: number) => {
    if (!isDemoMode) return;

    const token = DEMO_COMPANY_TOKEN;
    const cost = token.currentValue * amount;

    if (demoUserWallet.solanaBalance >= cost) {
      const updatedWallet = {...demoUserWallet};
      updatedWallet.solanaBalance -= cost;

      const existingTokenIndex = updatedWallet.purchasedTokens.findIndex(
        t => t.tokenId === tokenId
      );

      if (existingTokenIndex >= 0) {
        updatedWallet.purchasedTokens[existingTokenIndex].amount += amount;
        updatedWallet.purchasedTokens[existingTokenIndex].purchaseValue += cost;
        updatedWallet.purchasedTokens[existingTokenIndex].currentValue = 
          updatedWallet.purchasedTokens[existingTokenIndex].amount * token.currentValue;
      } else {
        updatedWallet.purchasedTokens.push({
          tokenId,
          amount,
          purchaseValue: cost,
          currentValue: amount * token.currentValue
        });
      }

      setDemoUserWallet(updatedWallet);

      const newTransaction: DemoTransaction = {
        id: `tx-${Date.now()}`,
        type: "purchase",
        tokenId,
        tokenName: token.name,
        tokenSymbol: token.symbol,
        amount,
        value: cost,
        timestamp: new Date().toISOString(),
        status: "completed"
      };

      setDemoTransactions([newTransaction, ...demoTransactions]);
      setLastPurchaseNotification({ tokenName: token.name, amount });
    }
  };

  const rewardWallet = (recipientWallet: string, amount: number) => {
    if (!isDemoMode || demoUserType !== "company") return;

    const newTransaction: DemoTransaction = {
      id: `tx-${Date.now()}`,
      type: "reward",
      tokenId: DEMO_COMPANY_TOKEN.id,
      tokenName: DEMO_COMPANY_TOKEN.name,
      tokenSymbol: DEMO_COMPANY_TOKEN.symbol,
      amount,
      value: amount * DEMO_COMPANY_TOKEN.currentValue,
      timestamp: new Date().toISOString(),
      status: "completed",
      recipientWallet,
      description: "Reward distribution"
    };

    setDemoTransactions([newTransaction, ...demoTransactions]);
  };

  const clearPurchaseNotification = () => {
    setLastPurchaseNotification(null);
  };

  const sellToken = (tokenId: string, amount: number) => {
    if (!isDemoMode) return;
    
    const token = DEMO_COMPANY_TOKEN;
    const tokenInWallet = demoUserWallet.purchasedTokens.find(t => t.tokenId === tokenId);
    
    if (tokenInWallet && tokenInWallet.amount >= amount) {
      const value = token.currentValue * amount;
      
      // Update the wallet
      const updatedWallet = {...demoUserWallet};
      updatedWallet.solanaBalance += value;
      
      const tokenIndex = updatedWallet.purchasedTokens.findIndex(t => t.tokenId === tokenId);
      updatedWallet.purchasedTokens[tokenIndex].amount -= amount;
      
      // Remove token from wallet if amount is 0
      if (updatedWallet.purchasedTokens[tokenIndex].amount === 0) {
        updatedWallet.purchasedTokens = updatedWallet.purchasedTokens.filter(
          (_, index) => index !== tokenIndex
        );
      } else {
        // Update the current value
        updatedWallet.purchasedTokens[tokenIndex].currentValue = 
          updatedWallet.purchasedTokens[tokenIndex].amount * token.currentValue;
      }
      
      setDemoUserWallet(updatedWallet);
      
      // Add transaction
      const newTransaction: DemoTransaction = {
        id: `tx-${Date.now()}`,
        type: "sale",
        tokenId,
        tokenName: token.name,
        tokenSymbol: token.symbol,
        amount,
        value,
        timestamp: new Date().toISOString(),
        status: "completed"
      };
      
      setDemoTransactions([newTransaction, ...demoTransactions]);
    }
  };

  const approveTransaction = (transactionId: string) => {
    if (!isDemoMode) return;
    
    const transactionIndex = demoTransactions.findIndex(t => t.id === transactionId);
    
    if (transactionIndex >= 0 && demoTransactions[transactionIndex].status === "pending") {
      const transaction = demoTransactions[transactionIndex];
      
      // Check if user has enough tokens
      const tokenInWallet = demoUserWallet.purchasedTokens.find(
        t => t.tokenId === transaction.tokenId
      );
      
      if (tokenInWallet && tokenInWallet.amount >= transaction.amount) {
        // Update transaction status
        const updatedTransactions = [...demoTransactions];
        updatedTransactions[transactionIndex] = {
          ...transaction,
          status: "completed"
        };
        
        // Update wallet
        const updatedWallet = {...demoUserWallet};
        const tokenIndex = updatedWallet.purchasedTokens.findIndex(
          t => t.tokenId === transaction.tokenId
        );
        
        updatedWallet.purchasedTokens[tokenIndex].amount -= transaction.amount;
        
        // Remove token if amount is 0
        if (updatedWallet.purchasedTokens[tokenIndex].amount === 0) {
          updatedWallet.purchasedTokens = updatedWallet.purchasedTokens.filter(
            (_, index) => index !== tokenIndex
          );
        } else {
          // Update current value
          updatedWallet.purchasedTokens[tokenIndex].currentValue = 
            updatedWallet.purchasedTokens[tokenIndex].amount * DEMO_COMPANY_TOKEN.currentValue;
        }
        
        setDemoUserWallet(updatedWallet);
        setDemoTransactions(updatedTransactions);
      }
    }
  };
  
  const rejectTransaction = (transactionId: string) => {
    if (!isDemoMode) return;
    
    const transactionIndex = demoTransactions.findIndex(t => t.id === transactionId);
    
    if (transactionIndex >= 0 && demoTransactions[transactionIndex].status === "pending") {
      const updatedTransactions = [...demoTransactions];
      updatedTransactions[transactionIndex] = {
        ...demoTransactions[transactionIndex],
        status: "cancelled"
      };
      
      setDemoTransactions(updatedTransactions);
    }
  };
  
  const addPendingTransaction = (
    tokenId: string, 
    amount: number, 
    merchant: string, 
    description: string
  ) => {
    if (!isDemoMode) return;
    
    const token = DEMO_COMPANY_TOKEN;
    const value = token.currentValue * amount;
    
    const newTransaction: DemoTransaction = {
      id: `tx-${Date.now()}`,
      type: "payment",
      tokenId,
      tokenName: token.name,
      tokenSymbol: token.symbol,
      amount,
      value,
      timestamp: new Date().toISOString(),
      status: "pending",
      merchant,
      description
    };
    
    setDemoTransactions([newTransaction, ...demoTransactions]);
  };

  return (
    <DemoContext.Provider 
      value={{ 
        isDemoMode, 
        toggleDemoMode, 
        demoUserType, 
        setDemoUserType,
        demoCompanyToken, 
        demoUserWallet, 
        demoTransactions,
        lastPurchaseNotification,
        purchaseToken,
        sellToken,
        approveTransaction,
        rejectTransaction,
        addPendingTransaction,
        rewardWallet,
        clearPurchaseNotification
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}