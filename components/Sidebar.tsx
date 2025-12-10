'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      name: 'New QR Code',
      href: '/new-qr',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6M9 15h6M12 12v6" />
        </svg>
      ),
    },
    {
      name: 'View Analytics',
      href: '/analytics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 6 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 6 22 6 22 12" />
        </svg>
      ),
    },
    {
      name: 'Manage QR Code',
      href: '/manage',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect x="7" y="7" width="3" height="3" />
          <rect x="14" y="7" width="3" height="3" />
          <rect x="7" y="14" width="3" height="3" />
          <rect x="14" y="14" width="3" height="3" />
        </svg>
      ),
    },
    {
      name: 'Account Setting',
      href: '/settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (!mounted || !pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r" style={{ backgroundColor: 'rgba(248, 248, 255, 1)', borderColor: 'rgba(83, 79, 235, 0.1)' }}>
      {/* Top Section - Branding */}
      <div className="px-6 py-6 flex items-center gap-3">
        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="QR Maker Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <h2 className="text-xl font-bold text-gray-900">QR Maker</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                  ? 'text-white shadow-md'
                  : 'text-gray-700'
                }`}
              style={active ? { backgroundColor: '#534FEB' } : {}}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'rgba(83, 79, 235, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className={active ? 'text-white' : 'text-gray-700'}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Section */}
      <div className="mx-4 mb-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(83, 79, 235, 0.1)' }}>
        {/* Funnel Illustration */}
        <div className="flex justify-center mb-4">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            {/* Funnel shape */}
            <path
              d="M20 20 L50 50 L80 20 L80 80 L20 80 Z"
              fill="#3B82F6"
              opacity="0.8"
            />
            <path
              d="M25 25 L50 50 L75 25 L75 75 L25 75 Z"
              fill="#60A5FA"
              opacity="0.6"
            />
            {/* Thin line extending upward */}
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="10"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Highlight for 3D effect */}
            <path
              d="M25 25 L50 50 L50 75 L25 75 Z"
              fill="#93C5FD"
              opacity="0.4"
            />
          </svg>
        </div>
        <button
          className="w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-md"
          style={{ backgroundColor: '#534FEB' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#433FE0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#534FEB';
          }}
        >
          Upgrade Now
        </button>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 w-full transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(83, 79, 235, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

