import { cache } from '../cache/cacheHandler';
import YahooFinance from "yahoo-finance2";

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export async function fetchCMP(symbol: string): Promise<number | null> {
    const cKey = `YF_${symbol}`;
    const cachedContent = cache.get<number>(cKey);
    if(cachedContent !== undefined) return cachedContent;

    const symbols = [`${symbol}.NS`,`${symbol}.BO`, `${symbol}.BSE`]

    for(const s of symbols) {
        try {
            const q = await yf.quote(s);
            const price = q?.regularMarketPrice;
            if(typeof price === "number") {
                cache.set(cKey, price);
                return price;
            }
        } catch {
        }
    }

    return null;
}