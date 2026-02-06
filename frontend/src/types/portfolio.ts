export interface Stock {
  name: string;
  exchange: string;
  purchasePrice: number;
  quantity: number;
  cmp: number;
  peRatio: number | null;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercentage: number;
}

export interface Sector {
  sectorName: string;
  stocksList: Stock[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}
