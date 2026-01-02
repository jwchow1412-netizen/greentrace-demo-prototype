'use client';
import { useState } from 'react';
import ChallengeProgress from './ChallengeProgress';
import { getMockTasks } from '@/lib/mock-data';

export default function TaskList() {
  const [tasks] = useState(getMockTasks());
  const [progress] = useState({ binPhotos: 1, coastalClean: 0 });

  return (
    <div className="space-y-4">
      {/* Task 1 */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
        <div className="flex justify-between">
          <h3 className="font-semibold">Photo Trash Bin</h3>
          <span className="text-green-600">50 Points</span>
        </div>
        <p className="text-sm text-gray-500">Take 1 bin photo</p>
        <ChallengeProgress current={progress.binPhotos} target={1} />
        <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm">
          Do Now
        </button>
      </div>

      {/* Task 2 */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
        <div className="flex justify-between">
          <h3 className="font-semibold">Clean Coastal Bin</h3>
          <span className="text-blue-500">100 Points + Badge</span>
        </div>
        <p className="text-sm text-gray-500">Clean 3 coastal bins</p>
        <ChallengeProgress current={progress.coastalClean} target={3} />
        <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Find Bins
        </button>
      </div>

      {/* Nearby Target */}
      <div className="bg-yellow-50 rounded-lg shadow p-4">
        <h3 className="font-semibold">Nearby: Trash Bin (120m)</h3>
        <p className="text-sm">Tap to navigate</p>
        <button className="mt-2 px-3 py-1 bg-yellow-400 rounded text-sm">
          VIEW
        </button>
      </div>
    </div>
  );
}