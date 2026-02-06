import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Sector } from "../../types/portfolio";

export default function InvestmentVsValueBar({
  sectors
}: {
  sectors: Sector[];
}) {
  const data = sectors.map((s) => ({
    name: s.sectorName,
    investment: s.totalInvestment,
    value: s.totalPresentValue
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-96">
      <h2 className="font-semibold mb-2">
        Investment vs Present Value
      </h2>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="investment" fill="#2563eb" />
          <Bar dataKey="value" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
