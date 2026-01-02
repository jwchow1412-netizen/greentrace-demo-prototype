'use client';
export default function PopupResult({ result, onConfirm }) {
  return (
    <div className="mt-4 p-3 bg-green-50 rounded-lg">
      <h4 className="font-semibold">AI Result</h4>
      <p>Type: {result.binType}</p>
      <p>Confidence: {Math.round(result.confidence * 100)}%</p>
      <button
        onClick={onConfirm}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm"
      >
        Done
      </button>
    </div>
  );
}