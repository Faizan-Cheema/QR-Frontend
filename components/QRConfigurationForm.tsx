'use client';

import { useState } from 'react';

interface QRConfigurationFormProps {
  qrType: string;
}

export default function QRConfigurationForm({ qrType }: QRConfigurationFormProps) {
  const [useUTM, setUseUTM] = useState(false);
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [setExpiry, setSetExpiry] = useState(false);
  const [useShortUrl, setUseShortUrl] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  return (
    <div className="w-full space-y-8">
      {/* URL Configuration, File Upload, or Dynamic QR */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {qrType === 'file' 
            ? 'File Upload' 
            : qrType === 'dynamic' 
            ? 'Dynamic QR Configuration' 
            : 'URL Configuration'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Title
            </label>
            <input
              type="text"
              placeholder="My Website QR Code"
              defaultValue="My Website QR Code"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {qrType === 'url' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          ) : qrType === 'dynamic' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default URL (if no conditions match)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/default"
                  defaultValue="https://example.com/default"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </>
          ) : qrType === 'file' ? (
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mb-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-gray-600 mb-1">
                    Drag & drop your file here or click to browse
                  </p>
                  <p className="text-sm text-gray-400">Max file size: 5MB</p>
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Device-based redirects - Only for Dynamic QR */}
      {qrType === 'dynamic' && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Device-based redirects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                defaultValue="https://example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desktop URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                defaultValue="https://example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>
      )}

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

