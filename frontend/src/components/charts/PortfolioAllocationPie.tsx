import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Sector } from "../../types/portfolio";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#7c3aed",
  "#0d9488"
];

export default function PortfolioAllocationPie({
  sectors
}: {
  sectors: Sector[];
}) {
  const data = sectors.map((s) => ({
    name: s.sectorName,
    value: s.totalPresentValue
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="font-semibold mb-2">Portfolio Allocation</h2>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
