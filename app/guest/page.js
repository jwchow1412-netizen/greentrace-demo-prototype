'use client';
import Link from 'next/link';
import MapContainer from '@/components/map/MapContainer';
import Button from '@/components/ui/Button';

export default function GuestDashboard() {
  return (
    <div className="h-full w-full">
      {/* Map Container (takes full screen) */}
      <MapContainer />

      {/* Floating Quick Actions */}
      <div className="fixed bottom-16 right-4 flex flex-col gap-3">
        <Link href="/guest/upload">
          <Button variant="primary" size="icon">+</Button>
        </Link>
        <Link href="/guest/heatmap">
          <Button variant="secondary" size="icon">🔥</Button>
        </Link>
        <Link href="/guest/rewards">
          <Button variant="secondary" size="icon">🏆</Button>
        </Link>
      </div>
    </div>
  );
}