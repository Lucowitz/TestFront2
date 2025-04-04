import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative overflow-hidden bg-[#121212]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,71,171,0.8)_0%,rgba(138,43,226,0.8)_100%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#121212_100%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#get-started" 
              className="w-full sm:w-auto bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] px-8 py-3 rounded-md font-medium text-white transition-all"
            >
              {t("hero.cta.get-started")}
            </a>
            <Link 
              href="/token-explorer"
              className="w-full sm:w-auto px-8 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors"
            >
              {t("hero.cta.explore-tokens")}
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
          <div className="bg-[#2A2A2A] bg-opacity-50 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-10 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#00D395] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00D395]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{t("hero.feature.mica")}</h3>
              <p className="text-sm text-gray-400">{t("hero.feature.mica.subtitle")}</p>
            </div>
          </div>
          
          <div className="bg-[#2A2A2A] bg-opacity-50 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-10 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{t("hero.feature.solana")}</h3>
              <p className="text-sm text-gray-400">{t("hero.feature.solana.subtitle")}</p>
            </div>
          </div>
          
          <div className="bg-[#2A2A2A] bg-opacity-50 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-10 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{t("hero.feature.custom")}</h3>
              <p className="text-sm text-gray-400">{t("hero.feature.custom.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
