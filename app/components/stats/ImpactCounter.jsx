'use client';
import { useState, useEffect } from 'react';

export default function ImpactCounter({ label, value, unit }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500; // Animation duration
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-green-600">{count} {unit}</p>
    </div>
  );
}