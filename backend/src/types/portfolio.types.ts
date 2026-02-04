// Stock has fields like name, exchange, Purchase Price and quantity as mentioned in data provided

interface Stock {
    name: string;
    exchange: string;
    purchasePrice: number;
    quantity: number;
}

// Stockcomputed has all properties of stocks + derived and market related data

interface StockComputed extends Stock {
    cmp: number;
    peRatio: string | null;
    latestEarning: string | null;
    investment: number;
    presentValue: number;
    gainLoss: number;
    portfolioPercentage: number;
}

// Aggregate all stocks belonging to the same sector

interface Sector {
    sectorName: string;
    stocksList: StockComputed[];
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
}

export { Stock, StockComputed, Sector };