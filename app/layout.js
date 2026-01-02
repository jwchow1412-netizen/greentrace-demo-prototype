'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isARMode, setIsARMode] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Game-style top nav */}
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 flex justify-between items-center z-50">
          <h1 className="font-bold text-green-600">GreenTrace</h1>
          <button 
            onClick={() => setIsARMode(!isARMode)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            {isARMode ? "Map Mode" : "AR Mode"}
          </button>
        </div>
        {/* Main content (full-screen) */}
        <div className="pt-12 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
