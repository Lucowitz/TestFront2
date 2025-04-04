export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  sector: TokenSector;
  marketCap: string;
  supply: string;
  price: string;
  imageUrl: string;
}

export type TokenSector = 
  | "retail" 
  | "hospitality" 
  | "technology" 
  | "entertainment" 
  | "health";
