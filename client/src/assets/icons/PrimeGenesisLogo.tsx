import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const PrimeGenesisLogo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div 
      className={`rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-heading font-bold text-xl">PG</span>
    </div>
  );
};

export default PrimeGenesisLogo;
