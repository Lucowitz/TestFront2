import { useLanguage } from "@/hooks/useLanguage";
import { Helmet } from "react-helmet";

export default function About() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>About Prime Genesis - Our Mission & Vision</title>
        <meta name="description" content="Learn about Prime Genesis - bridging traditional business models and Web3 innovation through custom tokens and simplified blockchain experiences." />
      </Helmet>
      
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Prime Genesis</span>
            </h1>
            <p className="text-lg text-gray-300">
              {t("about.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-gray-300 mb-6">
                At Prime Genesis, we aim to democratize blockchain technology by making it accessible to businesses of all sizes. 
                We believe that the future of commerce lies in the seamless integration of Web3 capabilities into everyday business operations.
              </p>
              <p className="text-gray-300 mb-6">
                Our mission is to provide businesses with the tools they need to create value through custom tokens while ensuring complete 
                regulatory compliance, transparency, and security for all stakeholders.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">Simplifying Blockchain</h4>
                    <p className="text-gray-400">Making complex blockchain technology accessible through intuitive interfaces and managed services</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">Regulatory Excellence</h4>
                    <p className="text-gray-400">Setting the standard for compliance in the crypto space with full adherence to EU MiCA regulations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#2A2A2A] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
              
              <h3 className="font-heading text-2xl font-bold mb-6 relative z-10">Our Values</h3>
              
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-lg">Transparency</h4>
                    <p className="text-gray-400">We believe in complete transparency in all aspects of token creation and management</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-lg">Innovation</h4>
                    <p className="text-gray-400">Continuously pushing the boundaries of what's possible with blockchain technology</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-lg">Accessibility</h4>
                    <p className="text-gray-400">Making blockchain technology accessible to everyone, regardless of technical expertise</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-lg">Security</h4>
                    <p className="text-gray-400">Implementing the highest standards of security to protect digital assets</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] p-0.5 rounded-xl h-full">
                <div className="bg-[#121212] p-8 rounded-[calc(0.75rem-1px)] h-full">
                  <h3 className="font-heading text-xl font-bold mb-4">Our Technology</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Solana Blockchain</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SPL Token Standard</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure Wallet Management</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>API-First Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-[#2A2A2A] p-8 rounded-xl">
              <h3 className="font-heading text-xl font-bold mb-6">Our Journey</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 mr-4">
                    <div className="w-8 h-8 rounded-full bg-[#0047AB] flex items-center justify-center">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="w-0.5 h-full bg-[#0047AB] mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">2021: Foundation</h4>
                    <p className="text-gray-400 mb-2">Prime Genesis was founded with a vision to bridge the gap between traditional businesses and blockchain technology</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 mr-4">
                    <div className="w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="w-0.5 h-full bg-[#8A2BE2] mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">2022: Technology Development</h4>
                    <p className="text-gray-400 mb-2">Development of our core token creation and wallet management infrastructure on Solana blockchain</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 mr-4">
                    <div className="w-8 h-8 rounded-full bg-[#00FFD1] flex items-center justify-center">
                      <span className="font-bold text-[#121212]">3</span>
                    </div>
                    <div className="w-0.5 h-full bg-[#00FFD1] mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">2023: MiCA Compliance</h4>
                    <p className="text-gray-400 mb-2">Early adoption of EU MiCA regulatory standards, establishing Prime Genesis as a leader in compliant token solutions</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 mr-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] flex items-center justify-center">
                      <span className="font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">2024: Expansion</h4>
                    <p className="text-gray-400 mb-2">Expanding our service offerings and partnerships across Europe, with a focus on empowering SMEs with blockchain capabilities</p>
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
