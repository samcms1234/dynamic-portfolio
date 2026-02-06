interface Props {
  name: string;
  investment: number;
  presentValue: number;
  gainLoss: number;
}

export default function SectorHeader({name, investment, presentValue, gainLoss}: Props) {
  return (
    <tr className="bg-gray-200 font-semibold">
      <td colSpan={11} className="px-4 py-2">
        {name} — Investment: ₹{investment.toLocaleString()} | 
        Value: ₹{presentValue.toLocaleString()} | 
        <span
          className={
            gainLoss >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          {" "}P/L: ₹{gainLoss.toLocaleString()}
        </span>
      </td>
    </tr>
  );
}
