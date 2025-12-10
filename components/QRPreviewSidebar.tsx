'use client';

import Image from 'next/image';

export default function QRPreviewSidebar() {
  return (
    <div className="w-full space-y-6">
      {/* QR Code Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">QR Code Preview</h3>
        
        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            {/* Placeholder QR Code - You can replace this with actual QR generation */}
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
              <svg width="192" height="192" viewBox="0 0 24 24" fill="black">
                <rect x="0" y="0" width="10" height="10" />
                <rect x="14" y="0" width="10" height="10" />
                <rect x="0" y="14" width="10" height="10" />
                <rect x="16" y="16" width="3" height="3" />
                <rect x="20" y="16" width="3" height="3" />
                <rect x="16" y="20" width="3" height="3" />
                <rect x="3" y="3" width="4" height="4" fill="white" />
                <rect x="17" y="3" width="4" height="4" fill="white" />
                <rect x="3" y="17" width="4" height="4" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 text-center mb-4">Scan this code to test it</p>
        
        {/* Copy Link Button */}
        <button className="w-full mb-3 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Copy Link
        </button>
        
        {/* Download Button */}
        <button
          className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors shadow-md hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: '#534FEB' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </button>
      </div>

      {/* Quota Usage */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quota Usage</h3>
        
        {/* QR Codes Usage */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">QR Codes</span>
            <span className="text-sm font-medium text-gray-700">24/50</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{ backgroundColor: '#534FEB', width: '48%' }}
            ></div>
          </div>
        </div>
        
        {/* Storage Usage */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Storage</span>
            <span className="text-sm font-medium text-gray-700">156 Mb / 500 Mb</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{ backgroundColor: '#534FEB', width: '31%' }}
            ></div>
          </div>
        </div>
        
        {/* Upgrade Link */}
        <button
          className="text-sm font-medium text-center w-full py-2"
          style={{ color: '#534FEB' }}
        >
          Upgrade For More
        </button>
      </div>
    </div>
  );
}

