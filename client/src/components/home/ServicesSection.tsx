import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="services" className="py-20 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {t("services.title").split("Services")[0]}
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            {t("services.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#121212] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0047AB] to-[#8A2BE2] opacity-10 rounded-bl-full"></div>
            <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">{t("services.business.title")}</h3>
            <p className="text-gray-300 mb-6 relative z-10">
              {t("services.business.desc")}
            </p>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg mb-1">{t("services.business.feature1.title")}</h4>
                  <p className="text-gray-400">{t("services.business.feature1.desc")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg mb-1">{t("services.business.feature2.title")}</h4>
                  <p className="text-gray-400">{t("services.business.feature2.desc")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg mb-1">{t("services.business.feature3.title")}</h4>
                  <p className="text-gray-400">{t("services.business.feature3.desc")}</p>
                </div>
              </div>
            </div>
            
            <Link
              href="/services"
              className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-[#0047AB] to-[#8A2BE2] hover:from-[#3373C4] hover:to-[#A45BF0] rounded-md font-medium text-white transition-all"
            >
              {t("services.business.cta")}
            </Link>
          </div>
          
          <div className="bg-[#121212] p-8 rounded-xl border border-white border-opacity-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8A2BE2] to-[#00FFD1] opacity-10 rounded-bl-full"></div>
            <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">{t("services.users.title")}</h3>
            <p className="text-gray-300 mb-6 relative z-10">
              {t("services.users.desc")}
            </p>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FFD1] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg mb-1">{t("services.users.feature1.title")}</h4>
                  <p className="text-gray-400">{t("services.users.feature1.desc")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0047AB] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3373C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg mb-1">{t("services.users.feature2.title")}</h4>
                  <p className="text-gray-400">{t("services.users.feature2.desc")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8A2BE2] bg-opacity-20 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A45BF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              href="/services"
              className="inline-block mt-8 px-6 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors"
            >
              {t("services.users.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
