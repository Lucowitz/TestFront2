import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import TokenCard from "@/components/tokens/TokenCard";
import TokenListFilter from "@/components/tokens/TokenListFilter";
import { demoTokens, officialTokens } from "@/data/tokens";
import { useDemo } from "@/context/DemoContext";
import { Token } from "@/types/tokens";

const TokenExplorerSection = () => {
  const { t } = useLanguage();
  const { isDemoMode } = useDemo();
  const initialTokens = isDemoMode ? demoTokens : officialTokens;
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(initialTokens.slice(0, 3));
  const [sector, setSector] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  useEffect(() => {
    let filtered = isDemoMode ? demoTokens : officialTokens;
    
    if (sector !== "all") {
      filtered = filtered.filter(token => token.sector === sector);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(token => 
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTokens(filtered.slice(0, 3));
  }, [sector, searchTerm]);
  
  const handleSectorChange = (newSector: string) => {
    setSector(newSector);
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <section id="token-explorer" className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#A45BF0] bg-clip-text text-transparent">
              {t("tokens.title")}
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            {t("tokens.subtitle")}
          </p>
        </div>
        
        {/* Filter & Search */}
        <TokenListFilter onSectorChange={handleSectorChange} onSearchChange={handleSearchChange} />
        
        {/* Token Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-400">No tokens found matching your criteria.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/token-explorer" 
            className="inline-block px-8 py-3 border border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:bg-opacity-10 rounded-md font-medium transition-colors"
          >
            {t("tokens.viewall")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TokenExplorerSection;
