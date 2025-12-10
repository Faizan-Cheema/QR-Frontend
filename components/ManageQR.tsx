'use client';

import Link from 'next/link';
import { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface QRCodeItem {
  id: number;
  name: string;
  scans: string;
  type: 'File' | 'URL' | 'Dynamic';
  status: 'Active' | 'Paused';
  creationDate: string;
  expiryDate: string;
  lastEdit: string;
}

export default function ManageQR() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState<QRCodeItem | null>(null);

  const qrCodes: QRCodeItem[] = [
    {
      id: 1,
      name: 'Product Brochure',
      scans: '32',
      type: 'File',
      status: 'Active',
      creationDate: 'May 29, 2017',
      expiryDate: 'May 29, 2017',
      lastEdit: 'May 29, 2017',
    },
    {
      id: 2,
      name: 'Event Registration',
      scans: '95',
      type: 'URL',
      status: 'Active',
      creationDate: 'May 29, 2017',
      expiryDate: 'May 29, 2017',
      lastEdit: 'May 29, 2017',
    },
    {
      id: 3,
      name: 'Customer Support',
      scans: '1,012',
      type: 'Dynamic',
      status: 'Paused',
      creationDate: 'May 29, 2017',
      expiryDate: 'May 29, 2017',
      lastEdit: 'May 29, 2017',
    },
    {
      id: 4,
      name: 'Product Brochure',
      scans: '1,756',
      type: 'Dynamic',
      status: 'Active',
      creationDate: 'May 29, 2017',
      expiryDate: 'May 29, 2017',
      lastEdit: 'May 29, 2017',
    },
    {
      id: 5,
      name: 'Event Registration',
      scans: '05',
      type: 'URL',
      status: 'Paused',
      creationDate: 'May 29, 2017',
      expiryDate: 'May 29, 2017',
      lastEdit: 'May 29, 2017',
    },
  ];

  const filteredQRCodes = qrCodes.filter((qr) =>
    qr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (qr: QRCodeItem) => {
    setSelectedQRCode(qr);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedQRCode) {
      // Handle delete logic here
      console.log('Deleting QR Code:', selectedQRCode);
      // You can add API call here to delete the QR code
    }
    setDeleteModalOpen(false);
    setSelectedQRCode(null);
  };

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage QR Codes</h1>
          <p className="text-gray-500">View, edit, and manage your QR code collection.</p>
        </div>
        <Link
          href="/new-qr"
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create New QR Code
        </Link>
      </div>

      {/* QR Codes Lists Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">QR Codes Lists</h2>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            className="px-4 py-3 rounded-lg text-white transition-all hover:opacity-90"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'rgba(83, 79, 235, 0.1)' }}>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    QR Code
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Scans
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Creation Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Expiry Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Last Edit
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQRCodes.map((qr, index) => (
                  <tr
                    key={qr.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {qr.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{qr.scans}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{qr.type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                          qr.status === 'Active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {qr.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{qr.creationDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{qr.expiryDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{qr.lastEdit}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/qr/${qr.id}`}
                          className="px-3 py-1 rounded text-sm font-medium text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: '#534FEB' }}
                        >
                          View/Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(qr)}
                          className="px-3 py-1 rounded text-sm font-medium text-red-600 border border-red-600 bg-transparent transition-all hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedQRCode(null);
        }}
        onConfirm={handleDeleteConfirm}
        qrCodeName={selectedQRCode?.name}
      />
    </div>
  );
}

