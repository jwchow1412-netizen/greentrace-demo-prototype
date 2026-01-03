'use client';
import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// 如果实际文件名是 GameBinMarker.jsx，请使用下面的导入；否则改为对应名称
import GameBinMarker from './GameBinMarker';
import HeatmapLayer from './HeatmapLayer';

// Initialize Mapbox (add your token in .env.local: NEXT_PUBLIC_MAPBOX_TOKEN)
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
if (!MAPBOX_TOKEN) {
  // 运行时输出警告，避免 silent failure
  console.warn('NEXT_PUBLIC_MAPBOX_TOKEN 未设置。请在 .env.local 中添加 NEXT_PUBLIC_MAPBOX_TOKEN');
}
mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapboxProvider = ({ children, isARMode }) => {
  return <div className="map-provider">{children}</div>;
};

export default function MapContainer({ isARMode = false }) {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapLoaded) return;
    if (isARMode) {
      setMapLoaded(true);
      return;
    }

    // 如果没有 token，仍可在开发中继续，但应避免抛错
    try {
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-74.006, 40.7128],
        zoom: 12,
      });

      newMap.addControl(new mapboxgl.NavigationControl());
      newMap.on('load', () => {
        setMap(newMap);
        setMapLoaded(true);

        const mockBins = [
          { id: 1, lat: 40.7128, lng: -74.006, cleanliness: 4 },
          { id: 2, lat: 40.7228, lng: -74.016, cleanliness: 2 },
        ];
        // 适配 GameBinMarker 构造方式
        mockBins.forEach(bin => {
          // 如果 GameBinMarker 导出为 React component 或对象，请根据实际实现调整
          if (typeof GameBinMarker === 'function') {
            new GameBinMarker(bin).addTo(newMap);
          } else {
            console.warn('GameBinMarker 导出类型非 function，需要检查实现');
          }
        });

        if (HeatmapLayer && typeof HeatmapLayer === 'function') {
          try {
            new HeatmapLayer(newMap).addLayer();
          } catch (e) {
            console.warn('HeatmapLayer 添加失败：', e);
          }
        }
      });

      // Cleanup
      return () => {
        try {
          newMap.remove();
        } catch (e) {
          console.warn('map remove 发生错误：', e);
        }
      };
    } catch (err) {
      console.error('初始化 Mapbox 出错：', err);
    }
  }, [isARMode, mapLoaded]);

  if (isARMode) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <p>AR Mode (Coming Soon!)</p>
      </div>
    );
  }

  return <div id="map" className="h-full w-full"></div>;
}