import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function Services() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>Services - Prime Genesis</title>
        <meta name="description" content="Explore Prime Genesis services: custom token creation, Web3 integration, and simplified wallet management for businesses and individuals." />
      </Helmet>
      
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg text-gray-300">
              {t("services.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 mb-20">
            <div className="bg-[#1E1E1E] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-5 rounded-bl-full"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative z-10">
                  <h2 className="text-3xl font-heading font-bold mb-6">{t("services.business.title")}</h2>
                  <p className="text-gray-300 mb-8">
                    {t("services.business.desc")}
                  </p>
                  
                  <div className="space-y-8 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.business.feature1.title")}</h4>
                        <p className="text-gray-400">{t("services.business.feature1.desc")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.business.feature2.title")}</h4>
                        <p className="text-gray-400">{t("services.business.feature2.desc")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.business.feature3.title")}</h4>
                        <p className="text-gray-400">{t("services.business.feature3.desc")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href="#business-consultation" 
                    className="inline-block px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] rounded-md font-medium text-white transition-all"
                  >
                    Schedule a Consultation
                  </a>
                </div>
                
                <div className="relative z-10">
                  <div className="bg-[#121212] p-6 rounded-xl mb-8">
                    <h3 className="font-heading text-xl font-bold mb-4">Token Creation Process</h3>
                    <ol className="space-y-6 relative">
                      <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gradient-to-b from-[#0047AB] via-[#8A2BE2] to-[#00FFD1] opacity-30"></div>
                      
                      <li className="flex">
                        <div className="flex-shrink-0 rounded-full h-7 w-7 flex items-center justify-center bg-[#0047AB] mr-3 z-10">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Consultation & Requirements</h4>
                          <p className="text-sm text-gray-400">We analyze your business needs and define token requirements</p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <div className="flex-shrink-0 rounded-full h-7 w-7 flex items-center justify-center bg-[#8A2BE2] mr-3 z-10">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Tokenomics Design</h4>
                          <p className="text-sm text-gray-400">Creating a sustainable economic model for your token ecosystem</p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <div className="flex-shrink-0 rounded-full h-7 w-7 flex items-center justify-center bg-[#A45BF0] mr-3 z-10">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Whitepaper Development</h4>
                          <p className="text-sm text-gray-400">Comprehensive documentation of token purpose and functionality</p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <div className="flex-shrink-0 rounded-full h-7 w-7 flex items-center justify-center bg-[#00FFD1] mr-3 z-10">
                          <span className="text-xs font-bold text-[#121212]">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Token Development & Testing</h4>
                          <p className="text-sm text-gray-400">Creating and rigorously testing your custom token on Solana</p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <div className="flex-shrink-0 rounded-full h-7 w-7 flex items-center justify-center bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] mr-3 z-10">
                          <span className="text-xs font-bold">5</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Launch & Integration</h4>
                          <p className="text-sm text-gray-400">Deploying your token and integrating with your business systems</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-[#121212] p-6 rounded-xl">
                    <h3 className="font-heading text-xl font-bold mb-4">Additional Business Services</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Web3 Payment Integration</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Custom Dashboard Development</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Marketing & Distribution Strategy</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Ongoing Technical Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8A2BE2] to-[#00FFD1] opacity-5 rounded-bl-full"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative z-10">
                  <h2 className="text-3xl font-heading font-bold mb-6">{t("services.users.title")}</h2>
                  <p className="text-gray-300 mb-8">
                    {t("services.users.desc")}
                  </p>
                  
                  <div className="space-y-8 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.users.feature1.title")}</h4>
                        <p className="text-gray-400">{t("services.users.feature1.desc")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.users.feature2.title")}</h4>
                        <p className="text-gray-400">{t("services.users.feature2.desc")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg mb-1">{t("services.users.feature3.title")}</h4>
                        <p className="text-gray-400">{t("services.users.feature3.desc")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/wallet" 
                    className="inline-block px-6 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors"
                  >
                    {t("wallet.cta")}
                  </Link>
                </div>
                
                <div className="relative z-10">
                  <div className="bg-[#121212] p-6 rounded-xl mb-8">
                    <h3 className="font-heading text-xl font-bold mb-4">Wallet Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 bg-[#2A2A2A] rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">Email Login</h4>
                        <p className="text-sm text-gray-400">Simple authentication with no seed phrases to remember</p>
                      </div>
                      
                      <div className="p-4 bg-[#2A2A2A] rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">Multi-Token Support</h4>
                        <p className="text-sm text-gray-400">Manage all your business tokens in one place</p>
                      </div>
                      
                      <div className="p-4 bg-[#2A2A2A] rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">One-Click Transfers</h4>
                        <p className="text-sm text-gray-400">Send and receive tokens with minimal steps</p>
                      </div>
                      
                      <div className="p-4 bg-[#2A2A2A] rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">Analytics Dashboard</h4>
                        <p className="text-sm text-gray-400">Track your portfolio performance over time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-xl">
                    <div className="bg-[#121212] p-6 rounded-[calc(0.75rem-1px)]">
                      <h3 className="font-heading text-xl font-bold mb-4">Security Features</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Two-factor authentication (2FA)</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Server-side private key encryption</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Transaction approval limits</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Real-time fraud monitoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </section>
    </>
  );
}
