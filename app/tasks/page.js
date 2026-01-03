'use client';
import { useState } from 'react';
import Link from 'next/link';
import ImpactCounter from '@/components/stats/ImpactCounter';

export default function Home() {
  const [isDemoMode, setIsDemoMode] = useState(true); // Default demo mode

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Demo Mode Toggle */}
      <div className="mb-8 flex items-center gap-2">
        <span>Demo Mode:</span>
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`px-3 py-1 rounded text-sm ${isDemoMode ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          {isDemoMode ? 'On' : 'Off'}
        </button>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-12 w-full max-w-3xl">
        <ImpactCounter label="Total Waste Sorted" value={12450} unit="kg" />
        <ImpactCounter label="Coastal Bins Cleaned" value={387} unit="bins" />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/guest" 
          className="px-6 py-3 bg-green-600 text-white rounded text-center"
        >
          Explore Map
        </Link>
        <Link 
          href="/guest/upload" 
          className="px-6 py-3 bg-blue-600 text-white rounded text-center"
        >
          Upload Data
        </Link>
      </div>
    </div>
  );
}