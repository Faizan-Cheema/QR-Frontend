'use client';

import { useState } from 'react';

export default function ViewAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('annually');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'by-qr', label: 'By QR Code' },
    { id: 'geography', label: 'Geography' },
    { id: 'devices', label: 'Devices' },
    { id: 'utm', label: 'UTM Performance' },
  ];

  const stats = [
    { label: 'Total Scans', value: '14', change: '10% vs last month', color: '#10B981' },
    { label: 'Unique Scanners', value: '08', change: '10% vs last month', color: '#10B981' },
    { label: 'Scans Today', value: '05', change: '10% vs last month', color: '#EF4444' },
    { label: 'Avg. Daily', value: '15', change: '10% vs last month', color: '#10B981' },
  ];

  // Mock data for the chart
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // Chart data points (scans per month)
  const chartData = [3800, 2500, 2800, 3248, 2100, 3500, 2900, 4200, 3100, 3600, 3300, 2800];
  const maxValue = 5000;

  // Calculate path points
  const getChartPath = () => {
    const points = chartData.map((value, index) => {
      const x = (index / (chartData.length - 1)) * 1000;
      const y = 300 - (value / maxValue) * 300;
      return { x, y, value };
    });
    return points;
  };

  const chartPoints = getChartPath();

  // Create smooth curve path
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;

      path += ` Q ${current.x} ${current.y} ${midX} ${(current.y + next.y) / 2}`;
      path += ` T ${next.x} ${next.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath(chartPoints);
  const areaPath = `${linePath} L 1000 300 L 0 300 Z`;

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Top performing QR codes data
  const topQRCodes = [
    { name: 'Product Brochure', type: 'File', totalScans: 1245, uniqueScans: 892, conversionRate: '71.6%' },
    { name: 'Event Registration', type: 'URL', totalScans: 567, uniqueScans: 432, conversionRate: '76.2%' },
    { name: 'Customer Support', type: 'Dynamic', totalScans: 234, uniqueScans: 198, conversionRate: '84.6%' },
    { name: 'Product Brochure', type: 'File', totalScans: 1245, uniqueScans: 892, conversionRate: '71.6%' },
    { name: 'Event Registration', type: 'URL', totalScans: 567, uniqueScans: 432, conversionRate: '76.2%' },
  ];

  // Geography data with varied heights
  const countryData = [
    { code: 'USA', name: 'United States', scans: 1200 },
    { code: 'CAN', name: 'Canada', scans: 2100 },
    { code: 'GBR', name: 'United Kingdom', scans: 4100 },
    { code: 'PAK', name: 'Pakistan', scans: 1700 },
    { code: 'IND', name: 'India', scans: 2300 },
    { code: 'SAU', name: 'Saudi Arabia', scans: 1059 },
    { code: 'RUS', name: 'Russia', scans: 1600 },
    { code: 'FRA', name: 'France', scans: 2700 },
    { code: 'JPN', name: 'Japan', scans: 4800 },
    { code: 'AUS', name: 'Australia', scans: 700 },
    { code: 'MEX', name: 'Mexico', scans: 3500 },
    { code: 'DEU', name: 'Germany', scans: 1300 },
  ];

  const maxCountryScans = Math.max(...countryData.map(c => c.scans));
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Analytics</h1>
          <p className="text-gray-600">Track performance and scan data for your QR codes.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="flex gap-3 bg-white rounded-full p-2 shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 font-medium transition-all rounded-full ${activeTab === tab.id
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                style={
                  activeTab === tab.id
                    ? { backgroundColor: '#534FEB' }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-4">{stat.value}</div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs text-gray-600 flex-shrink-0">{stat.label}</div>
                    <div className="text-xs whitespace-nowrap text-right" style={{ color: stat.color }}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scan Trends Chart */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Scan Trends</h2>
                <div className="flex gap-3 bg-gray-100 rounded-full p-2">
                  {['Daily', 'Weekly', 'Annually'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range.toLowerCase())}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${timeRange === range.toLowerCase()
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      style={
                        timeRange === range.toLowerCase()
                          ? { backgroundColor: '#534FEB' }
                          : {}
                      }
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative h-80">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500">
                  <span>5k</span>
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>

                {/* Chart container */}
                <div className="ml-12 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-gray-100"></div>
                    ))}
                  </div>

                  {/* SVG Chart */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 300"
                    preserveAspectRatio="none"
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#534FEB', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#534FEB', stopOpacity: 0.05 }} />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d={areaPath}
                      fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#534FEB"
                      strokeWidth="3"
                    />

                    {/* Interactive points */}
                    {chartPoints.map((point, index) => (
                      <g key={index}>
                        {/* Invisible larger circle for easier hover */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="20"
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => {
                            console.log('Hovering month:', months[index], 'Value:', point.value);
                            setHoveredPoint(index);
                          }}
                        />
                        {/* Visible point */}
                        {hoveredPoint === index && (
                          <>
                            <circle cx={point.x} cy={point.y} r="10" fill="#534FEB" opacity="0.2" />
                            <circle cx={point.x} cy={point.y} r="6" fill="#534FEB" />
                          </>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Tooltip */}
                  {hoveredPoint !== null && (
                    <div
                      className="absolute bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
                      style={{
                        left: `${(hoveredPoint / (chartPoints.length - 1)) * 100}%`,
                        top: `${((300 - chartPoints[hoveredPoint].y) / 300) * 100}%`,
                        transform: 'translate(-50%, -120%)'
                      }}
                    >
                      {chartPoints[hoveredPoint].value.toLocaleString()} scans
                      <div className="text-xs text-gray-300">{months[hoveredPoint]}</div>
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0"
                        style={{
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #1F2937',
                        }}
                      ></div>
                    </div>
                  )}

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-4">
                    {months.map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing QR Codes Table */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing QR Codes</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">QR Code</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Type</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Total Scans</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Unique Scans</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topQRCodes.map((qr, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-gray-700">{qr.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{qr.type}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{qr.totalScans.toLocaleString()}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{qr.uniqueScans.toLocaleString()}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{qr.conversionRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Export Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </>
        )}

        {/* By QR Code Tab Content */}
        {activeTab === 'by-qr' && (
          <>
            {/* Stats Cards for By QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">75</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Total Scans</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">45</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Unique Scanners</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">10</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Scans Today</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#EF4444' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">2 Hours ago</div>
                <div className="text-xs text-gray-600">Last Scan</div>
              </div>
            </div>

            {/* Scan Result Chart */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Scan Result</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Select QR:</span>
                    <select className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Product Brochure</option>
                      <option>Event Registration</option>
                      <option>Customer Support</option>
                    </select>
                  </div>
                  <div className="flex gap-3 bg-gray-100 rounded-full p-2">
                    {['Daily', 'Weekly', 'Annually'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range.toLowerCase())}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${timeRange === range.toLowerCase()
                          ? 'text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-200'
                          }`}
                        style={
                          timeRange === range.toLowerCase()
                            ? { backgroundColor: '#534FEB' }
                            : {}
                        }
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative h-80">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500">
                  <span>5k</span>
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>

                {/* Chart container */}
                <div className="ml-12 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-gray-100"></div>
                    ))}
                  </div>

                  {/* SVG Chart */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 300"
                    preserveAspectRatio="none"
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#534FEB', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#534FEB', stopOpacity: 0.05 }} />
                      </linearGradient>
                    </defs>

                    <path d={areaPath} fill="url(#chartGradient)" />
                    <path d={linePath} fill="none" stroke="#534FEB" strokeWidth="3" />

                    {chartPoints.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="20"
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredPoint(index)}
                        />
                        {hoveredPoint === index && (
                          <>
                            <circle cx={point.x} cy={point.y} r="10" fill="#534FEB" opacity="0.2" />
                            <circle cx={point.x} cy={point.y} r="6" fill="#534FEB" />
                          </>
                        )}
                      </g>
                    ))}
                  </svg>

                  {hoveredPoint !== null && (
                    <div
                      className="absolute bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
                      style={{
                        left: `${(hoveredPoint / (chartPoints.length - 1)) * 100}%`,
                        top: `${((300 - chartPoints[hoveredPoint].y) / 300) * 100}%`,
                        transform: 'translate(-50%, -120%)'
                      }}
                    >
                      {chartPoints[hoveredPoint].value.toLocaleString()} scans
                      <div className="text-xs text-gray-300">{months[hoveredPoint]}</div>
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0"
                        style={{
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #1F2937',
                        }}
                      ></div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-4">
                    {months.map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </>
        )}

        {/* Geography Tab Content */}
        {activeTab === 'geography' && (
          <>
            {/* Stats Cards for Geography */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">87</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Countries Reached</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">187</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Japan Scan</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">15%</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Japan Share</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#EF4444' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">Japan</div>
                <div className="text-xs text-gray-600">Top Country</div>
              </div>
            </div>

            {/* Scan by Countries Chart */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Scan by countries</h2>
                <div className="flex gap-3 bg-gray-100 rounded-full p-2">
                  {['Daily', 'Weekly', 'Annually'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range.toLowerCase())}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${timeRange === range.toLowerCase()
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      style={
                        timeRange === range.toLowerCase()
                          ? { backgroundColor: '#534FEB' }
                          : {}
                      }
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="relative" style={{ height: '400px' }}>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500">
                  <span>5k</span>
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>

                {/* Chart container */}
                <div className="ml-12 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-gray-100"></div>
                    ))}
                  </div>

                  {/* Bars */}
                  <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between gap-6 px-6" style={{ height: 'calc(100% - 32px)' }}>
                    {countryData.map((country, index) => {
                      // Calculate height - bars should reach up to their value on 5k scale
                      const heightPercent = (country.scans / 5000) * 100;
                      return (
                        <div
                          key={country.code}
                          className="relative flex flex-col items-center justify-end"
                          style={{ width: '1%', minWidth: '15px', height: '100%' }}
                          onMouseEnter={() => setHoveredCountry(index)}
                          onMouseLeave={() => setHoveredCountry(null)}
                        >
                          {/* Tooltip */}
                          {hoveredCountry === index && (
                            <div className="absolute bottom-full mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap z-10">
                              {country.scans.toLocaleString()} scans
                              <div className="text-xs text-gray-300">{country.name}</div>
                              <div
                                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                                style={{
                                  borderLeft: '6px solid transparent',
                                  borderRight: '6px solid transparent',
                                  borderTop: '6px solid #1F2937',
                                }}
                              ></div>
                            </div>
                          )}
                          {/* Background bar (gray) - only up to 100% (5k line) */}
                          <div className="absolute bottom-0 w-full rounded-t-md" style={{ backgroundColor: '#F3F4F6', height: '100%' }}></div>
                          {/* Actual bar (blue) */}
                          <div
                            className="w-full rounded-t-md transition-all cursor-pointer relative z-10"
                            style={{
                              height: `${heightPercent}%`,
                              backgroundColor: hoveredCountry === index ? '#534FEB' : '#6366F1',
                              minHeight: '20px',
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-4 px-2">
                    {countryData.map((country) => (
                      <span key={country.code} className="flex-1 text-center">{country.code}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Country Performance Details Table */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Country Performance Details</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Country</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Scans</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Unique Scanner</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">% of Total</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">United States of America</td>
                      <td className="py-4 px-4 text-sm text-gray-700">934</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Canada</td>
                      <td className="py-4 px-4 text-sm text-gray-700">503</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">United Kingdom</td>
                      <td className="py-4 px-4 text-sm text-gray-700">613</td>
                      <td className="py-4 px-4 text-sm text-gray-700">234</td>
                      <td className="py-4 px-4 text-sm text-gray-700">84.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Pakistan</td>
                      <td className="py-4 px-4 text-sm text-gray-700">282</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">India</td>
                      <td className="py-4 px-4 text-sm text-gray-700">927</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Saudi Arabia</td>
                      <td className="py-4 px-4 text-sm text-gray-700">748</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Russia</td>
                      <td className="py-4 px-4 text-sm text-gray-700">834</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">France</td>
                      <td className="py-4 px-4 text-sm text-gray-700">13671</td>
                      <td className="py-4 px-4 text-sm text-gray-700">234</td>
                      <td className="py-4 px-4 text-sm text-gray-700">84.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Japan</td>
                      <td className="py-4 px-4 text-sm text-gray-700">107</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Australia</td>
                      <td className="py-4 px-4 text-sm text-gray-700">955</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Mexico</td>
                      <td className="py-4 px-4 text-sm text-gray-700">200</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">South Africa</td>
                      <td className="py-4 px-4 text-sm text-gray-700">509</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Export Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </>
        )}

        {/* Devices Tab Content */}
        {activeTab === 'devices' && (
          <>
            {/* Stats Cards for Devices */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">68%</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Mobile</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">28%</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Desktop</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">04%</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Tablet</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#EF4444' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">Mobile</div>
                <div className="text-xs text-gray-600">Top Performance Device</div>
              </div>
            </div>

            {/* Device Type Distribution */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Device Type Distribution</h2>
                <div className="flex gap-3 bg-gray-100 rounded-full p-2">
                  {['Daily', 'Weekly', 'Annually'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range.toLowerCase())}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${timeRange === range.toLowerCase()
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      style={
                        timeRange === range.toLowerCase()
                          ? { backgroundColor: '#534FEB' }
                          : {}
                      }
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Bar Chart */}
              <div className="space-y-8">
                {/* Mobile */}
                <div className="relative">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 font-medium">Mobile</span>
                  </div>
                  <div className="relative mb-1">
                    <div className="flex justify-between text-xs text-gray-400 px-1">
                      <span>0</span>
                      <span>0.5k</span>
                      <span>1k</span>
                      <span>1.5k</span>
                      <span>2k</span>
                      <span>2.5k</span>
                      <span>3k</span>
                      <span>3.5k</span>
                      <span>4k</span>
                      <span>4.5k</span>
                      <span>5k</span>
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg overflow-visible" style={{ height: '18px' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-lg transition-all flex items-center justify-end pr-4 cursor-pointer"
                      style={{ width: '68%', backgroundColor: hoveredDevice === 'mobile' ? '#534FEB' : '#6366F1' }}
                      onMouseEnter={() => setHoveredDevice('mobile')}
                      onMouseLeave={() => setHoveredDevice(null)}
                    >
                      {/* Tooltip */}
                      {hoveredDevice === 'mobile' && (
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg">
                          4,507 scans
                          <div className="text-xs text-gray-300">Mobile</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop */}
                <div className="relative">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 font-medium">Desktop</span>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg overflow-visible" style={{ height: '18px' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-lg transition-all cursor-pointer flex items-center justify-end pr-4"
                      style={{ width: '20%', backgroundColor: hoveredDevice === 'desktop' ? '#534FEB' : '#6366F1' }}
                      onMouseEnter={() => setHoveredDevice('desktop')}
                      onMouseLeave={() => setHoveredDevice(null)}
                    >
                      {/* Tooltip */}
                      {hoveredDevice === 'desktop' && (
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg">
                          1,400 scans
                          <div className="text-xs text-gray-300">Desktop</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tablet */}
                <div className="relative">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 font-medium">Tablet</span>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg overflow-visible" style={{ height: '18px' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-lg transition-all cursor-pointer flex items-center justify-end pr-4"
                      style={{ width: '3%', backgroundColor: hoveredDevice === 'tablet' ? '#534FEB' : '#6366F1', minWidth: '40px' }}
                      onMouseEnter={() => setHoveredDevice('tablet')}
                      onMouseLeave={() => setHoveredDevice(null)}
                    >
                      {/* Tooltip */}
                      {hoveredDevice === 'tablet' && (
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap">
                          200 scans
                          <div className="text-xs text-gray-300">Tablet</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </>
        )}

        {/* UTM Performance Tab Content */}
        {activeTab === 'utm' && (
          <>
            {/* Stats Cards for UTM */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">08</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Active Campaigns</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">742</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">UTM Scans</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#10B981' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">18.7%</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-600 flex-shrink-0">Avg. Conversion</div>
                  <div className="text-xs whitespace-nowrap text-right" style={{ color: '#EF4444' }}>
                    10% vs last month
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-4">Email</div>
                <div className="text-xs text-gray-600">Top Source</div>
              </div>
            </div>

            {/* UTM Mediums Chart */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">UTM Mediums</h2>
                <div className="flex gap-3 bg-gray-100 rounded-full p-2">
                  {['Daily', 'Weekly', 'Annually'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range.toLowerCase())}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${timeRange === range.toLowerCase()
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      style={
                        timeRange === range.toLowerCase()
                          ? { backgroundColor: '#534FEB' }
                          : {}
                      }
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Bar Chart */}
              <div className="space-y-8">
                {/* Online */}
                <div className="relative">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 font-medium">Online</span>
                  </div>
                  <div className="relative mb-1">
                    <div className="flex justify-between text-xs text-gray-400 px-1">
                      <span>0</span>
                      <span>0.5k</span>
                      <span>1k</span>
                      <span>1.5k</span>
                      <span>2k</span>
                      <span>2.5k</span>
                      <span>3k</span>
                      <span>3.5k</span>
                      <span>4k</span>
                      <span>4.5k</span>
                      <span>5k</span>
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg overflow-visible" style={{ height: '18px' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-lg transition-all flex items-center justify-end pr-4 cursor-pointer"
                      style={{ width: '90%', backgroundColor: hoveredDevice === 'online' ? '#534FEB' : '#6366F1' }}
                      onMouseEnter={() => setHoveredDevice('online')}
                      onMouseLeave={() => setHoveredDevice(null)}
                    >
                      {/* Tooltip */}
                      {hoveredDevice === 'online' && (
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg">
                          4,507 scans
                          <div className="text-xs text-gray-300">Online</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Offline */}
                <div className="relative">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 font-medium">Offline</span>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg overflow-visible" style={{ height: '18px' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-lg transition-all cursor-pointer flex items-center justify-end pr-4"
                      style={{ width: '25%', backgroundColor: hoveredDevice === 'offline' ? '#534FEB' : '#6366F1' }}
                      onMouseEnter={() => setHoveredDevice('offline')}
                      onMouseLeave={() => setHoveredDevice(null)}
                    >
                      {/* Tooltip */}
                      {hoveredDevice === 'offline' && (
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg">
                          1,250 scans
                          <div className="text-xs text-gray-300">Offline</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UTM Campaign Performance Details Table */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">UTM Campaign Performance Details</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Campaign</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Source</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Medium</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Scans</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Unique</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Conversions</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Conversions rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Spring Sale 2024</td>
                      <td className="py-4 px-4 text-sm text-gray-600">email</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Online</td>
                      <td className="py-4 px-4 text-sm text-gray-700">934</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Social Media Launch</td>
                      <td className="py-4 px-4 text-sm text-gray-600">instagram</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Online</td>
                      <td className="py-4 px-4 text-sm text-gray-700">503</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Website Redesign</td>
                      <td className="py-4 px-4 text-sm text-gray-600">google</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Online</td>
                      <td className="py-4 px-4 text-sm text-gray-700">613</td>
                      <td className="py-4 px-4 text-sm text-gray-700">234</td>
                      <td className="py-4 px-4 text-sm text-gray-700">84.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Trade Show Booth</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Bill Board</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Offline</td>
                      <td className="py-4 px-4 text-sm text-gray-700">282</td>
                      <td className="py-4 px-4 text-sm text-gray-700">1,245</td>
                      <td className="py-4 px-4 text-sm text-gray-700">71.6%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                          +12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-700">Product Demo</td>
                      <td className="py-4 px-4 text-sm text-gray-600">linkedin</td>
                      <td className="py-4 px-4 text-sm text-gray-600">Online</td>
                      <td className="py-4 px-4 text-sm text-gray-700">927</td>
                      <td className="py-4 px-4 text-sm text-gray-700">567</td>
                      <td className="py-4 px-4 text-sm text-gray-700">76.2%</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                          -3.7%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Export Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#534FEB' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
