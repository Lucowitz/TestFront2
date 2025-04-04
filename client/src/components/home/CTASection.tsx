import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-[#1E1E1E] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,71,171,0.8)_0%,rgba(138,43,226,0.8)_100%)] opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#121212] p-8 md:p-12 rounded-2xl border border-white border-opacity-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">Blockchain Journey</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
            <div className="bg-[#2A2A2A] p-6 rounded-xl">
              <h3 className="font-heading text-xl font-bold mb-3">{t("cta.business.title")}</h3>
              <p className="text-gray-300 mb-6">
                {t("cta.business.desc")}
              </p>
              <a 
                href="#business-signup" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] rounded-md font-medium text-white transition-all w-full text-center"
              >
                {t("cta.business.button")}
              </a>
            </div>
            
            <div className="bg-[#2A2A2A] p-6 rounded-xl">
              <h3 className="font-heading text-xl font-bold mb-3">{t("cta.users.title")}</h3>
              <p className="text-gray-300 mb-6">
                {t("cta.users.desc")}
              </p>
              <Link 
                href="/wallet" 
                className="inline-block px-6 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors w-full text-center"
              >
                {t("cta.users.button")}
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 relative z-10">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00D395] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{t("cta.feature1")}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00D395] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <span>{t("cta.feature2")}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00D395] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{t("cta.feature3")}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00D395] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span>{t("cta.feature4")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
