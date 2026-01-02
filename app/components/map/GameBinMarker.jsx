'use client';
import { useState } from 'react';

export default function GameBinMarker({ bin }) {
  // Inject pulse animation CSS
  useState(() => {
    if (!document.getElementById('game-marker-css')) {
      const style = document.createElement('style');
      style.id = 'game-marker-css';
      style.textContent = `
        .bin-marker { position: relative; display: flex; flex-direction: column; align-items: center; }
        .bin-icon { width: 40px; height: 40px; border-radius: 50%; background: #00f; color: white;
          display: flex; align-items: center; justify-content: center; font-weight: bold;
          box-shadow: 0 0 10px #00f, 0 0 20px #00f4; animation: pulse 2s infinite; }
        .bin-label { position: absolute; top: 45px; background: white; padding: 2px 6px;
          border-radius: 4px; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        @keyframes pulse { 0% { box-shadow: 0 0 10px #00f; } 50% { box-shadow: 0 0 20px #00f; } 100% { box-shadow: 0 0 10px #00f; } }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Create marker DOM element
  const getElement = () => {
    const container = document.createElement('div');
    container.className = 'bin-marker';

    const icon = document.createElement('div');
    icon.className = 'bin-icon';
    icon.textContent = bin.bin_type.slice(0, 1);

    const label = document.createElement('div');
    label.className = 'bin-label';
    label.textContent = `${bin.bin_type} Bin`;

    container.appendChild(icon);
    container.appendChild(label);
    return container;
  };

  return <>{/* Returns DOM element for Mapbox */}</>;
}