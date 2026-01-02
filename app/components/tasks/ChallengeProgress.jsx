'use client';
export default function ChallengeProgress({ current, target }) {
  const percent = (current / target) * 100;
  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{current}/{target} Complete</p>
    </div>
  );
}