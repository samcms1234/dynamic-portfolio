interface Props {
  label: string;
  value: string;
  positive?: boolean;
}

export default function StatCard({ label, value, positive }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`text-xl font-semibold ${
          positive === undefined
            ? ""
            : positive
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
