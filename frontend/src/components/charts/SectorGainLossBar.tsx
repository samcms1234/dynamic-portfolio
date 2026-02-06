import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Sector } from "../../types/portfolio";

export default function SectorGainLossBar({
  sectors
}: {
  sectors: Sector[];
}) {
  const data = sectors.map((s) => ({
    name: s.sectorName,
    gainLoss: s.totalGainLoss
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="font-semibold mb-2">
        Sector-wise Gain / Loss
      </h2>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="gainLoss">
            {data.map((d, idx) => (
              <Cell
                key={idx}
                fill={d.gainLoss >= 0 ? "#16a34a" : "#dc2626"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
