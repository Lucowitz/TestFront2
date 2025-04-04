import { useLanguage } from "@/hooks/useLanguage";
import { Helmet } from "react-helmet";

export default function Compliance() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>Regulatory Compliance - Prime Genesis</title>
        <meta name="description" content="Learn how Prime Genesis ensures all tokens adhere to EU MiCA regulations, providing transparency, security, and legal certainty for businesses and users." />
      </Helmet>
      
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
                {t("compliance.title")}
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              {t("compliance.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
                
                <h3 className="font-heading text-2xl font-bold mb-6 relative z-10">{t("compliance.whitepaper.title")}</h3>
                <p className="text-gray-300 mb-6 relative z-10">
                  {t("compliance.whitepaper.desc")}
                </p>
                
                <ul className="space-y-4 mb-8 relative z-10">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t("compliance.whitepaper.feature1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t("compliance.whitepaper.feature2")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t("compliance.whitepaper.feature3")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t("compliance.whitepaper.feature4")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t("compliance.whitepaper.feature5")}</span>
                  </li>
                </ul>
                
                <a href="#whitepaper-example" className="inline-block px-6 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors relative z-10">
                  {t("compliance.whitepaper.cta")}
                </a>
              </div>
            </div>
            
            <div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl border border-white border-opacity-5 mb-8">
                <div className="flex items-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00D395] mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-heading text-xl font-bold">{t("compliance.mica.title")}</h4>
                </div>
                <p className="text-gray-300">
                  {t("compliance.mica.desc")}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-xl">
                <div className="bg-[#121212] p-8 rounded-[calc(0.75rem-1px)]">
                  <h4 className="font-heading text-xl font-bold mb-4">{t("compliance.commitment.title")}</h4>
                  <p className="text-gray-300 mb-6">
                    {t("compliance.commitment.desc")}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between text-sm">
                    <div className="flex items-center mb-4 md:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{t("compliance.commitment.feature1")}</span>
                    </div>
                    
                    <div className="flex items-center mb-4 md:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>{t("compliance.commitment.feature2")}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <span>{t("compliance.commitment.feature3")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
              EU MiCA Regulation <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Timeline</span>
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#0047AB] to-[#8A2BE2] opacity-50"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                  <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                    <div className="bg-[#2A2A2A] p-5 rounded-lg shadow">
                      <h3 className="font-bold text-lg mb-2">June 2023</h3>
                      <p className="text-gray-400">MiCA regulation entered into force</p>
                    </div>
                  </div>
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#121212] border-4 border-[#0047AB] rounded-full order-1 md:order-2 my-4 md:my-0">
                    <span className="text-2xl">1</span>
                  </div>
                  <div className="flex-1 md:pl-8 order-3"></div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                  <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1"></div>
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#121212] border-4 border-[#8A2BE2] rounded-full order-1 md:order-2 my-4 md:my-0">
                    <span className="text-2xl">2</span>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="bg-[#2A2A2A] p-5 rounded-lg shadow">
                      <h3 className="font-bold text-lg mb-2">December 2023</h3>
                      <p className="text-gray-400">Implementation of provisions relating to stablecoins</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                  <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                    <div className="bg-[#2A2A2A] p-5 rounded-lg shadow">
                      <h3 className="font-bold text-lg mb-2">June 2024</h3>
                      <p className="text-gray-400">Implementation of remaining MiCA provisions, including authorization requirements</p>
                    </div>
                  </div>
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#121212] border-4 border-[#00FFD1] rounded-full order-1 md:order-2 my-4 md:my-0">
                    <span className="text-2xl">3</span>
                  </div>
                  <div className="flex-1 md:pl-8 order-3"></div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                  <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1"></div>
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#121212] border-4 border-[#0047AB] rounded-full order-1 md:order-2 my-4 md:my-0">
                    <span className="text-2xl">4</span>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-lg">
                      <div className="bg-[#121212] p-5 rounded-[calc(0.5rem-1px)]">
                        <h3 className="font-bold text-lg mb-2">December 2024</h3>
                        <p className="text-gray-400">Full MiCA compliance required for all crypto asset service providers</p>
                      </div>
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
