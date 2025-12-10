'use client';

import Link from 'next/link';
import QRStats from '@/components/QRStats';
import QREditForm from '@/components/QREditForm';
import QREditSidebar from '@/components/QREditSidebar';

export default function QREditPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <main className="p-6 md:p-8">
        {/* Header with Title and Back Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Event Registration (URL QR)
            </h1>
            <p className="text-gray-500">View, edit, and manage your QR code</p>
          </div>
          <Link
            href="/manage"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#534FEB' }}
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
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to QR List
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <QRStats />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Edit Form */}
          <div className="lg:col-span-2">
            <QREditForm />
          </div>
          
          {/* Right Side - Preview Sidebar */}
          <div className="lg:col-span-1">
            <QREditSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

