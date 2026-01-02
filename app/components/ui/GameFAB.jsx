'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function GameFAB({ map, onOpenUpload }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-40">
      {/* Main FAB (Take Photo) */}
      <button
        onClick={() => onOpenUpload(true)}
        className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg text-xl"
      >
        📸
      </button>

      {/* Secondary FABs */}
      {isMenuOpen && (
        <>
          <Link href="/tasks" className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md">
            🎯
          </Link>
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
            🗑️
          </button>
        </>
      )}

      {/* Toggle menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-md"
      >
        {isMenuOpen ? '✕' : '+'}
      </button>
    </div>
  );
}