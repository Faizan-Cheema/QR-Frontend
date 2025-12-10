'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date: "13 January, 2024"
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = now.toLocaleDateString('en-US', dateOptions);
      
      // Format time: "11:23 AM"
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    // Update every minute
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Welcome message */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">
            Welcome back! Faizan Cheema
          </h1>
          <p className="text-sm text-gray-500 mt-1 min-h-[20px]">
            {mounted && currentDate && currentTime ? `${currentDate} · ${currentTime}` : ''}
          </p>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
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
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#534FEB' }}></span>
          </button>

          {/* Profile Picture with Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            {/* Profile Picture - Split face design */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <div className="absolute inset-0 flex">
                {/* Left half - beige/skin tone */}
                <div className="w-1/2 bg-[#f5e6d3]"></div>
                {/* Right half - teal/blue */}
                <div className="w-1/2 bg-[#a8d5e2]"></div>
              </div>
              {/* Hair - light brown/beige */}
              <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-[#d4a574] rounded-full"></div>
            </div>
            
            {/* Dropdown Chevron */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: '#534FEB' }}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

