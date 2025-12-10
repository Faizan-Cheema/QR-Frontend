'use client';

import { useState } from 'react';
import CreateNewQR from "@/components/CreateNewQR";
import QRConfigurationForm from "@/components/QRConfigurationForm";
import QRPreviewSidebar from "@/components/QRPreviewSidebar";

export default function NewQRPage() {
  const [selectedQRType, setSelectedQRType] = useState<string>('url');

  return (
    <div className="min-h-screen bg-white">
      <main className="p-6 md:p-8">
        <CreateNewQR 
          selectedType={selectedQRType}
          onTypeChange={setSelectedQRType}
        />
        
        {/* Two Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Configuration Form */}
          <div className="lg:col-span-2">
            <QRConfigurationForm qrType={selectedQRType} />
          </div>
          
          {/* Right Side - Preview Sidebar */}
          <div className="lg:col-span-1">
            <QRPreviewSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

