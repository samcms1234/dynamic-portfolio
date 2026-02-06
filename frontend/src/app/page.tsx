"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/portfolioApi";
import { Sector } from "../types/portfolio";
import Loader from "../components/Loader";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "@/components/StateCard";
import PortfolioTable from "../components/PortfolioTable";
import PortfolioAllocationPie from "../components/charts/PortfolioAllocationPie";
import SectorGainLossBar from "../components/charts/SectorGainLossBar";
import InvestmentVsValueBar from "../components/charts/InvestmentVsValueBar";
import { formatINR } from "../utils/format";

export default function Home() {
  const [data, setData] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetchPortfolio();
    setData(res);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <Loader />;

  const totalInvestment = data.reduce(
    (s, x) => s + x.totalInvestment,
    0
  );
  const totalValue = data.reduce(
    (s, x) => s + x.totalPresentValue,
    0
  );
  const totalGainLoss = totalValue - totalInvestment;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Investment"
          value={formatINR(totalInvestment)}
        />
        <StatCard
          label="Present Value"
          value={formatINR(totalValue)}
        />
        <StatCard
          label="Overall Gain / Loss"
          value={formatINR(totalGainLoss)}
          positive={totalGainLoss >= 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PortfolioAllocationPie sectors={data} />
        <SectorGainLossBar sectors={data} />
      </div>

      <div className="mb-10">
        <InvestmentVsValueBar sectors={data} />
      </div>

      <PortfolioTable sectors={data} />
    </main>
  );
}
