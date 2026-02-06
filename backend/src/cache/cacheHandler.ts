import NodeCache from "node-cache";
import dotenv from 'dotenv';

dotenv.config();

const cache = new NodeCache({
    stdTTL: Number(process.env.CACHE_TTL) || 15
});

export { cache };