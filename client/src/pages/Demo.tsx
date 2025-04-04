import { useLanguage } from "@/hooks/useLanguage";
import { useDemo } from "@/context/DemoContext";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Demo() {
  const { t } = useLanguage();
  const { toggleDemoMode, setDemoUserType } = useDemo();
  const [, navigate] = useLocation();

  const handleStartDemo = (userType: "company" | "user") => {
    toggleDemoMode(); // Enter demo mode
    setDemoUserType(userType);
    
    if (userType === "company") {
      navigate("/wallet");
    } else {
      navigate("/wallet");
    }
  };

  return (
    <>
      <Helmet>
        <title>Demo Mode - Prime Genesis</title>
        <meta name="description" content="Experience Prime Genesis platform in demo mode. Try out token creation, management, and transactions in a risk-free environment." />
      </Helmet>
      
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Demo <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Mode</span>
            </h1>
            <p className="text-lg text-gray-300">
              Experience Prime Genesis platform in a simulated environment. Try out our features without any real transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-[#1E1E1E] border border-white border-opacity-5 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
              
              <h3 className="font-heading text-xl font-bold mb-4 relative z-10">For Companies</h3>
              <div className="space-y-4 mb-6 relative z-10">
                <p className="text-gray-300">
                  See how your company can benefit from custom token creation and management on the Solana blockchain.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Explore a sample company token</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View token performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monitor transaction activity</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative z-10">
                <Button 
                  onClick={() => handleStartDemo("company")}
                  className="w-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0]"
                >
                  Start Company Demo
                </Button>
              </div>
            </Card>
            
            <Card className="bg-[#1E1E1E] border border-white border-opacity-5 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00FFD1] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
              
              <h3 className="font-heading text-xl font-bold mb-4 relative z-10">For Users</h3>
              <div className="space-y-4 mb-6 relative z-10">
                <p className="text-gray-300">
                  Experience how easy it is to interact with company tokens and make transactions on the platform.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Try our simplified wallet interface</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Buy and sell sample tokens</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Approve payment requests</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative z-10">
                <Button 
                  onClick={() => handleStartDemo("user")}
                  className="w-full border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10"
                  variant="outline"
                >
                  Start User Demo
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <h3 className="font-heading text-xl font-bold mb-4">How Demo Mode Works</h3>
            <p className="text-gray-300 mb-8">
              Our demo mode provides a realistic simulation of the Prime Genesis platform using sample data.
              All transactions are simulated and no real blockchain interactions take place.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-[#1E1E1E] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Demo Solana Balance</h4>
                <p className="text-sm text-gray-400">Start with 50 SOL demo balance to buy tokens</p>
              </div>
              
              <div className="p-6 bg-[#1E1E1E] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Simulated Trades</h4>
                <p className="text-sm text-gray-400">Buy and sell tokens in a risk-free environment</p>
              </div>
              
              <div className="p-6 bg-[#1E1E1E] rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Example Token</h4>
                <p className="text-sm text-gray-400">Interact with our sample "PrimeGen Coffee" token</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="p-6 bg-[#1E1E1E] rounded-lg border border-white border-opacity-5">
              <h3 className="font-heading text-xl font-bold mb-4 text-center">Token Case Study: PrimeGen Coffee</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">Token Creation</h4>
                    <p className="text-sm text-gray-400">
                      Coffee chain with 50 locations created 100,000 PGCF tokens with an initial value of $0.05 USD per token
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">Growth & Usage</h4>
                    <p className="text-sm text-gray-400">
                      Within 3 months, token value increased to $0.12 as customers used PGCF for purchases and earned loyalty rewards
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg mb-1">Benefits Realized</h4>
                    <p className="text-sm text-gray-400">
                      Company increased customer retention by 32% and gained valuable insights from transaction data
                    </p>
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