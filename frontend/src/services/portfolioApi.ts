import { Sector } from "../types/portfolio";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function fetchPortfolio(): Promise<Sector[]> {
  const res = await fetch(`${API_BASE_URL}`);

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}
