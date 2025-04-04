import { useLanguage } from "@/hooks/useLanguage";

const WalletSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="wallet" className="py-20 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {t("wallet.title").split("Wallet Management")[0]}
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
              Wallet Management
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            {t("wallet.subtitle")}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-[#121212] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-5 rounded-bl-full"></div>
              
              <h3 className="font-heading text-2xl font-bold mb-6 relative z-10">{t("wallet.why.title")}</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">{t("wallet.why.feature1.title")}</h4>
                    <p className="text-gray-400">{t("wallet.why.feature1.desc")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">{t("wallet.why.feature2.title")}</h4>
                    <p className="text-gray-400">{t("wallet.why.feature2.desc")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">{t("wallet.why.feature3.title")}</h4>
                    <p className="text-gray-400">{t("wallet.why.feature3.desc")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#create-wallet" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] rounded-md font-medium text-white transition-all"
                >
                  {t("wallet.cta")}
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-[#121212] rounded-xl overflow-hidden border border-white border-opacity-10">
              <div className="bg-[#2A2A2A] py-4 px-6 border-b border-white border-opacity-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-medium">{t("wallet.dashboard.title")}</h3>
                  <span className="text-[#00D395] flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("wallet.dashboard.status")}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-400 text-sm">{t("wallet.dashboard.balance")}</h4>
                    <a href="#" className="text-[#00FFD1] text-sm hover:underline">{t("wallet.dashboard.history")}</a>
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold font-heading mr-2">$1,245.32</span>
                    <span className="text-[#00D395] text-sm mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      +12.5%
                    </span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-gray-400 text-sm mb-4">{t("wallet.dashboard.tokens")}</h4>
                  <div className="space-y-4">
                    <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] flex items-center justify-center mr-3">
                          <span className="text-white font-medium">CCT</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Crave Coffee Token</h5>
                          <span className="text-sm text-gray-400">120 CCT</span>
                        </div>
                      </div>
                      <span className="font-mono">$14.40</span>
                    </div>
                    
                    <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#00FFD1] flex items-center justify-center mr-3">
                          <span className="text-white font-medium">TNT</span>
                        </div>
                        <div>
                          <h5 className="font-medium">TechNova Token</h5>
                          <span className="text-sm text-gray-400">350 TNT</span>
                        </div>
                      </div>
                      <span className="font-mono">$122.50</span>
                    </div>
                    
                    <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#0047AB] flex items-center justify-center mr-3">
                          <span className="text-white font-medium">FLT</span>
                        </div>
                        <div>
                          <h5 className="font-medium">FitLife Token</h5>
                          <span className="text-sm text-gray-400">1,000 FLT</span>
                        </div>
                      </div>
                      <span className="font-mono">$100.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#2A2A2A] hover:bg-[#1E1E1E] transition-colors py-3 rounded-lg font-medium">
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t("wallet.dashboard.send")}
                    </span>
                  </button>
                  <button className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] transition-all py-3 rounded-lg font-medium">
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      {t("wallet.dashboard.receive")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
