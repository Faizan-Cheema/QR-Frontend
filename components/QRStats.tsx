'use client';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

function StatCard({ title, value, change, isPositive = true }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      {change && (
        <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      )}
    </div>
  );
}

export default function QRStats() {
  const stats = [
    {
      title: 'Total Scans',
      value: '75',
      change: '10% vs last month',
      isPositive: true,
    },
    {
      title: 'Unique Scanners',
      value: '45',
      change: '10% vs last month',
      isPositive: true,
    },
    {
      title: 'Scans Today',
      value: '10',
      change: '10% vs last month',
      isPositive: false,
    },
    {
      title: 'Last Scan',
      value: '2 Hours ago',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          isPositive={stat.isPositive}
        />
      ))}
    </div>
  );
}

