'use client';

import { useState } from 'react';

export default function QREditForm() {
  const [useUTM, setUseUTM] = useState(false);
  const [passwordProtection, setPasswordProtection] = useState(true);
  const [setExpiry, setSetExpiry] = useState(true);
  const [useShortUrl, setUseShortUrl] = useState(true);
  const [qrColor, setQrColor] = useState('#000000');

  return (
    <div className="w-full space-y-8">
      {/* URL Configuration */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">URL Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Title
            </label>
            <input
              type="text"
              defaultValue="My Website QR Code"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination URL (Not editable)
            </label>
            <input
              type="url"
              defaultValue="https://example.com"
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* QR Customization */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">QR Customization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Color
            </label>
            <div className="relative">
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              <div
                className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                style={{ backgroundColor: qrColor }}
              ></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Size
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Small (200x200)</option>
              <option selected>Medium (300x300)</option>
              <option>Large (500x500)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Advanced Options */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={passwordProtection}
                onChange={(e) => setPasswordProtection(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Password Protection</span>
            </label>
            {passwordProtection && (
              <input
                type="password"
                placeholder="Set Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={setExpiry}
                onChange={(e) => setSetExpiry(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Set Expiry Date</span>
            </label>
            {setExpiry && (
              <input
                type="date"
                placeholder="dd/m/yyyy"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useShortUrl}
                onChange={(e) => setUseShortUrl(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Use Short URL</span>
            </label>
          </div>
        </div>
      </section>

      {/* UTM Parameters */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">UTM Parameters</h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useUTM}
              onChange={(e) => setUseUTM(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
              style={{
                backgroundColor: useUTM ? '#534FEB' : '#E5E7EB',
              }}
            ></div>
          </label>
        </div>

        {useUTM && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTM Source
              </label>
              <input
                type="text"
                placeholder="dolmen_mall"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTM Medium
              </label>
              <input
                type="text"
                placeholder="offline"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTM Campaign
              </label>
              <input
                type="text"
                placeholder="summer_sale"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTM Term (Optional)
              </label>
              <input
                type="text"
                placeholder="poster_gate"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTM Content (Optional)
              </label>
              <input
                type="text"
                placeholder="basement_floor"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

