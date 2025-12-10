'use client';

interface ScanRecord {
  qrName: string;
  deviceName: string;
  location: string;
  date: string;
  time: string;
}

export default function RecentQRScan() {
  const scanRecords: ScanRecord[] = [
    {
      qrName: 'Project 1',
      deviceName: 'Tablet',
      location: 'Pakistan',
      date: 'May 29, 2017',
      time: '5:45 am',
    },
    {
      qrName: 'Project 2',
      deviceName: 'Desktop',
      location: 'London',
      date: 'May 29, 2017',
      time: '8:20 am',
    },
    {
      qrName: 'Project 3',
      deviceName: 'Mobile',
      location: 'Pakistan',
      date: 'May 29, 2017',
      time: '7:30 am',
    },
    {
      qrName: 'Project 4',
      deviceName: 'Tablet',
      location: 'London',
      date: 'May 29, 2017',
      time: '5:40 am',
    },
    {
      qrName: 'Project 5',
      deviceName: 'Desktop',
      location: 'Japan',
      date: 'May 29, 2017',
      time: '6:45 am',
    },
  ];

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent QR Scan</h2>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr style={{ backgroundColor: 'rgba(83, 79, 235, 0.1)' }}>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  QR Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Device Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {scanRecords.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{record.qrName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.deviceName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

