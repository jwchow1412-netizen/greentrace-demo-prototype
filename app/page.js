'use client';
import { useState } from 'react';
import MapContainer from './components/map/MapContainer.jsx';

// 必须是默认导出的React组件
export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <MapContainer isDemoMode={true} />
    </div>
  );
}