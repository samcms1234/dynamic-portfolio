import axios from "axios";

const SERP_API_KEY = process.env.SERPAPI_KEY!;

export async function fetchPERatioFromSerpApi(
  symbol: string
): Promise<string> {
  try {
    const query = `${symbol}:NSE`;

    const url = "https://serpapi.com/search.json";

    const res = await axios.get(url, {
      params: {
        engine: "google_finance",
        q: query,
        api_key: SERP_API_KEY
      },
      timeout: 8000
    });

    const knowledgeGraph = res.data?.knowledge_graph;
    if (!knowledgeGraph?.key_stats?.stats) return "";

    const peStat = knowledgeGraph.key_stats.stats.find(
      (s: any) => s.label === "P/E ratio"
    );

    if (!peStat?.value) return "";

    const pe = peStat.value.replace(/[^\d.]/g, "");
    return Number.isNaN(pe) ? "" : pe;
  } catch {
    return "";
  }
}
