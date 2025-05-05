import type { Token } from "@/context/DemoContext"

// Your single `tokens` array, unchanged
const tokens: Token[] = [
  {
    id: "token1",
    name: "Real Estate Fund",
    symbol: "REF",
    description:
      "Un token che rappresenta quote di un fondo immobiliare diversificato con proprietà in tutta Italia. Offre rendimenti stabili e potenziale di crescita del capitale.",
    issuer: "Italian Properties Group",
    totalSupply: 100000,
    currentPrice: 50,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "equity",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minInvestment: 500,
    targetRaise: 5000000,
    raisedAmount: 2500000,
  },
  {
    id: "token2",
    name: "Green Energy Bond",
    symbol: "GEB",
    description:
      "Un token di debito che finanzia progetti di energia rinnovabile in Italia. Offre un tasso di interesse fisso del 5% con pagamenti trimestrali.",
    issuer: "Energia Verde SpA",
    totalSupply: 50000,
    currentPrice: 100,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "debt",
    startDate: "2023-02-15",
    endDate: "2024-02-15",
    minInvestment: 1000,
    targetRaise: 5000000,
    raisedAmount: 3750000,
  },
  {
    id: "token3",
    name: "Tech Startup Equity",
    symbol: "TSE",
    description:
      "Un token che rappresenta azioni in una promettente startup tecnologica italiana specializzata in soluzioni di intelligenza artificiale per il settore sanitario.",
    issuer: "HealthTech Innovations",
    totalSupply: 20000,
    currentPrice: 250,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "equity",
    startDate: "2023-03-10",
    endDate: "2023-09-10",
    minInvestment: 2500,
    targetRaise: 5000000,
    raisedAmount: 1250000,
  },
  {
    id: "token4",
    name: "Luxury Brand Token",
    symbol: "LBT",
    description:
      "Un token utility che offre vantaggi esclusivi, sconti e accesso anticipato ai prodotti di un rinomato marchio di lusso italiano.",
    issuer: "Milano Luxury Group",
    totalSupply: 10000,
    currentPrice: 500,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "utility",
    startDate: "2023-04-01",
    endDate: "2023-10-01",
    minInvestment: 500,
    targetRaise: 5000000,
    raisedAmount: 4000000,
  },
  {
    id: "token5",
    name: "Infrastructure Project",
    symbol: "IPT",
    description:
      "Un token di debito che finanzia un importante progetto infrastrutturale in Italia. Offre un rendimento del 6% annuo con una durata di 5 anni.",
    issuer: "Infrastrutture Italiane SpA",
    totalSupply: 200000,
    currentPrice: 100,
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
    type: "debt",
    startDate: "2023-05-15",
    endDate: "2023-11-15",
    minInvestment: 1000,
    targetRaise: 20000000,
    raisedAmount: 15000000,
  },
]

// **Named exports** so all your
// `import { demoTokens, officialTokens } from "@/data/tokens"`
// lines continue to work unchanged:
export const demoTokens = tokens
export const officialTokens = tokens

// Keep the default export if you use it elsewhere:
export default tokens
