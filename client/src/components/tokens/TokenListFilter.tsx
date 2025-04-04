import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { TokenSector } from "@/types/tokens";

interface TokenListFilterProps {
  onSectorChange: (sector: string) => void;
  onSearchChange: (search: string) => void;
}

const TokenListFilter = ({ onSectorChange, onSearchChange }: TokenListFilterProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSectorChange(e.target.value);
  };

  const sectors: { value: string; label: string }[] = [
    { value: "all", label: t("tokens.filter.sector") },
    { value: "retail", label: t("tokens.sectors.retail") },
    { value: "hospitality", label: t("tokens.sectors.hospitality") },
    { value: "technology", label: t("tokens.sectors.technology") },
    { value: "entertainment", label: t("tokens.sectors.entertainment") },
    { value: "health", label: t("tokens.sectors.health") },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button 
          className="px-4 py-2 bg-[#0047AB] bg-opacity-20 text-[#3373C4] rounded-md font-medium text-sm hover:bg-opacity-30 transition-colors"
          onClick={() => onSectorChange("all")}
        >
          {t("tokens.filter.all")}
        </button>
        <div className="relative">
          <select 
            className="appearance-none bg-[#2A2A2A] border border-white border-opacity-10 rounded-md px-4 py-2 text-sm font-medium text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            onChange={handleSectorChange}
          >
            {sectors.map((sector) => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative w-full md:w-64">
        <input 
          type="text" 
          placeholder={t("tokens.filter.search")} 
          className="w-full px-4 py-2 bg-[#2A2A2A] border border-white border-opacity-10 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TokenListFilter;
