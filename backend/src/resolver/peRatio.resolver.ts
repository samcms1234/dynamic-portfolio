import { fetchGoogleParams } from "../services/google.service";
import { fetchPERatioFromSerpApi } from "../services/serpAPI.service";
import { cache } from "../cache/cacheHandler";

const CACHE_TTL = 24 * 60 * 60;

export async function resolvePER(symbol: string): Promise<string> {

  const cacheKey = `RESOLVED_PE_${symbol}`;
  const cached = cache.get<string>(cacheKey);

  if (cached !== undefined) {
    return cached;
  }

  const google = await fetchGoogleParams(symbol);
  if (google.peRatio) {
    cache.set(cacheKey, google.peRatio, CACHE_TTL);
    return google.peRatio;
  }

  const serpPe = await fetchPERatioFromSerpApi(symbol);
  cache.set(cacheKey, serpPe, CACHE_TTL);

  return serpPe;
}
