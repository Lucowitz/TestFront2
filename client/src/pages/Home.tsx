import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import TokenExplorerSection from "@/components/home/TokenExplorerSection";
import WalletSection from "@/components/home/WalletSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>Prime Genesis - Custom Token Creation & Wallet Management</title>
        <meta name="description" content="Prime Genesis creates custom tokens on Solana for businesses and offers simplified wallet management. EU MiCA compliant crypto solutions for every business." />
      </Helmet>
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TokenExplorerSection />
      <WalletSection />
      <ComplianceSection />
      <CTASection />
    </>
  );
}
