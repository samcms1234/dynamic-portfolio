import portfolioData from '../data/portfolio.json';
import { fetchCMP } from './yahoo.service';
import { fetchGoogleParams } from './google.service';
import { Sector } from '../types/portfolio.types';

export async function buildPort(): Promise<Sector[]> {
    const sectors: Sector[] = JSON.parse(JSON.stringify(portfolioData));
    let totalPortfolioValue = 0;

    for(const sec of sectors) {
        sec.totalInvestment = 0;
        sec.totalPresentValue = 0;

        for(const stock of sec.stocksList) {
            const cmp = await fetchCMP(stock.exchange);
            const googleData = await fetchGoogleParams(stock.exchange);

            stock.cmp = cmp;
            stock.peRatio = googleData?.peRatio;
            stock.latestEarning = googleData?.earnings;

            stock.investment = stock.purchasePrice * stock.quantity;
            stock.presentValue = cmp * stock.quantity;
            stock.gainLoss = stock.presentValue - stock.investment;

            sec.totalInvestment += stock.investment;
            sec.totalPresentValue += stock.presentValue;
        }

        sec.totalGainLoss = sec.totalPresentValue - sec.totalInvestment;

        totalPortfolioValue += sec.totalPresentValue;
    }

    for(const sector of sectors) {
        for(const stock of sector.stocksList) {
            stock.portfolioPercentage = (stock.presentValue/totalPortfolioValue) * 100;
        }
    }
    return sectors;
}