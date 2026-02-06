import axios from "axios";
import * as cheerio from "cheerio";
import { cache } from '../cache/cacheHandler';

export async function fetchGoogleParams(symbol:string) {

    const url = `https://www.google.com/finance/quote/${symbol}:NSE`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      },
      timeout: 5000
    })

    const html = res.data;

    const $ = cheerio.load(html);

    if(!html) {
      throw new Error("No HTML returned from google finance");
    }

    const peRatio =  $("div[data-attrid='PE_RATIO']").first().text() || null;
    const earnings = $("div[data-attrid='EARNINGS']").first().text() || null; 

    const result = {peRatio, earnings:earnings};
    return result;
}