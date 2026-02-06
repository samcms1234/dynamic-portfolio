import portfolioData from '../data/portfolio.json';
import { fetchCMP } from './yahoo.service';
import { fetchPERatioFromSerpApi } from './serpAPI.service';
import { Sector } from '../types/portfolio.types';
import { resolvePER } from '../resolver/peRatio.resolver';

export async function buildPort(): Promise<Sector[]> {
    const sectors: Sector[] = JSON.parse(JSON.stringify(portfolioData));
    let totalPortfolioValue = 0;

    for(const sec of sectors) {
        sec.totalInvestment = 0;
        sec.totalPresentValue = 0;

        for(const stock of sec.stocksList) {
            const cmp = await fetchCMP(stock.exchange);
            const peRatio = await resolvePER(stock.exchange);

            stock.cmp = cmp ?? 0;
            stock.peRatio = peRatio;

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