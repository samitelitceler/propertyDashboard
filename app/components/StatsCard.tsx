interface StatsCardProps {
  title: string;
  value: number;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
} 