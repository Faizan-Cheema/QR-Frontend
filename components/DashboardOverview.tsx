'use client';

interface StatCardProps {
  value: string;
  label: string;
  change: string;
  isPositive: boolean;
}

function StatCard({ value, label, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const stats = [
    {
      value: '150',
      label: 'Total Qr Codes',
      change: '+10% vs last month',
      isPositive: true,
    },
    {
      value: '125',
      label: 'Total Scans',
      change: '+10% vs last month',
      isPositive: true,
    },
    {
      value: '15',
      label: 'UTM Scans',
      change: '-10% vs last month',
      isPositive: false,
    },
    {
      value: '05',
      label: 'Active Campaigns',
      change: '+10% vs last month',
      isPositive: true,
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Here's your QR code performance summary.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>
    </div>
  );
}

