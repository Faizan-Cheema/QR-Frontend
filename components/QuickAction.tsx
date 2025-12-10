'use client';

import Link from 'next/link';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function QuickActionButton({ icon, label, href }: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-6 py-4 rounded-lg text-white font-medium transition-all hover:opacity-90 shadow-md"
      style={{ backgroundColor: '#534FEB' }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function QuickAction() {
  const actions = [
    {
      label: 'Create New QR',
      href: '/new-qr',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      label: 'View Analytics',
      href: '/analytics',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 6 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 6 22 6 22 12" />
        </svg>
      ),
    },
    {
      label: 'Manage QR',
      href: '/manage',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect x="7" y="7" width="3" height="3" />
          <rect x="14" y="7" width="3" height="3" />
          <rect x="7" y="14" width="3" height="3" />
          <rect x="14" y="14" width="3" height="3" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          <path d="M18 5v2M18 6h-1M18 6h1M17.5 5.5l1 1M17.5 6.5l1-1" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Action</h2>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            href={action.href}
          />
        ))}
      </div>
    </div>
  );
}

