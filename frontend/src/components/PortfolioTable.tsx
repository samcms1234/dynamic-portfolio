import { Sector } from "../types/portfolio";
import SectorHeader from "./SectorHeader";

interface Props {
  sectors: Sector[];
}

export default function PortfolioTable({ sectors }: Props) {
  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-3 py-2">Stock</th>
          <th>Buy Price</th>
          <th>Qty</th>
          <th>Investment</th>
          <th>Portfolio %</th>
          <th>Exchange</th>
          <th>CMP</th>
          <th>Present Value</th>
          <th>P/L</th>
          <th>P/E</th>
        </tr>
      </thead>

      <tbody>
        {sectors.map((sector) => (
          <>
            <SectorHeader
              key={sector.sectorName}
              name={sector.sectorName}
              investment={sector.totalInvestment}
              presentValue={sector.totalPresentValue}
              gainLoss={sector.totalGainLoss}
            />

            {sector.stocksList.map((stock) => (
              <tr
                key={stock.name}
                className="border-t text-center"
              >
                <td className="px-2 py-1 text-left">
                  {stock.name}
                </td>
                <td>{stock.purchasePrice.toFixed(2)}</td>
                <td>{stock.quantity}</td>
                <td>{stock.investment}</td>
                <td>{stock.portfolioPercentage.toFixed(2)}%</td>
                <td>{stock.exchange}</td>
                <td>{stock.cmp}</td>
                <td>{stock.presentValue.toFixed(2)}</td>
                <td
                  className={
                    stock.gainLoss >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stock.gainLoss.toFixed(2)}
                </td>
                <td>{stock.peRatio ?? "—"}</td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}
