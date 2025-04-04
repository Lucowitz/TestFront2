import { useLanguage } from "@/hooks/useLanguage";
import { useDemo } from "@/context/DemoContext";
import WalletSection from "@/components/home/WalletSection";
import UserWalletDemo from "@/components/wallet/UserWalletDemo";
import BusinessWalletDemo from "@/components/wallet/BusinessWalletDemo";

export default function Wallet() {
  const { isDemoMode, demoUserType } = useDemo();

  if (!isDemoMode) {
    return <WalletSection />;
  }

  return demoUserType === 'company' ? <BusinessWalletDemo /> : <UserWalletDemo />;
}