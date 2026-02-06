"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/portfolioApi";
import { Sector } from "../types/portfolio";
import PortfolioTable from "../components/PortfolioTable";
import Loader from "../components/Loader";

export default function Home() {
  const [data, setData] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetchPortfolio();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Portfolio Dashboard
      </h1>

      <PortfolioTable sectors={data} />
    </main>
  );
}
