import NodeCache from "node-cache";
import dotenv from 'dotenv';

dotenv.config();

const CACHE_TTL = 24 * 60 * 60;

const cache = new NodeCache({
    stdTTL: Number(CACHE_TTL)
});

export { cache };