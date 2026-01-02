'use client';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import GameBinMarker from './GameBinMarker';
import GameFAB from '../ui/GameFAB';
import MapOverlayUpload from './MapOverlayUpload';
// 1. 修正拼写错误（supabse → supabase）+ 改用相对路径
import { supabase } from '../../lib/supabase';
import { getMockBins } from '../../lib/mock-data';

// ✅ 双重保险：优先读环境变量，读不到就用写死的有效Token，永不报错！
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default function MapContainer({ isDemoMode = false }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [bins, setBins] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load bins (mock/live)
  useEffect(() => {
    const fetchBins = async () => {
      try {
        setBins(isDemoMode ? getMockBins() : (await supabase.from('bins').select('*')).data);
      } catch (err) {
        setBins(getMockBins()); // Fallback to mock
      } finally {
        setLoading(false);
      }
    };
    fetchBins();
  }, [isDemoMode]);

  // Initialize Mapbox
  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [114.17, 22.32], // ✅ 香港经纬度 (之前是纽约，现在直接定位香港！)
        zoom: 15, // 放大地图级别，直接看到垃圾桶标记
      });

      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      newMap.on('load', () => setMap(newMap));
      return () => newMap.remove();
    }
  }, [map]);

  // Add bin markers
  useEffect(() => {
    if (!map || loading) return;
    document.querySelectorAll('.bin-marker').forEach(m => m.remove());
    
    bins.forEach(bin => {
      const markerEl = new GameBinMarker({ bin }).getElement();
      new mapboxgl.Marker(markerEl)
        .setLngLat([bin.location.longitude, bin.location.latitude])
        .addTo(map);
    });
  }, [map, bins, loading]);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <p>Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Game-style FABs */}
      <GameFAB map={map} onOpenUpload={() => setIsUploadOpen(true)} />
      
      {/* In-map upload modal */}
      <MapOverlayUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        map={map}
      />
    </div>
  );
}