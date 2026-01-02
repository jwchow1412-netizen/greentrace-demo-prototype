'use client';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function PhotoUploader({ type, onUploadComplete }) {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)');
      return;
    }
    setError('');

    // Preview
    setPreview(URL.createObjectURL(file));
    setPhoto(file);
  };

  const handleUpload = async () => {
    if (!photo) {
      setError('Select a photo first');
      return;
    }

    // Compress
    const compressed = await imageCompression(photo, { maxSizeMB: 0.5 });
    onUploadComplete(compressed);
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="border-2 border-dashed rounded-lg p-4 h-48 flex items-center justify-center">
        {preview ? <img src={preview} alt="Preview" className="max-h-full" /> : <p>Select a photo</p>}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`photo-upload-${type}`}
      />
      <label
        htmlFor={`photo-upload-${type}`}
        className="block w-full py-2 px-4 border border-gray-300 rounded-lg text-center cursor-pointer"
      >
        Choose Photo
      </label>
      <button
        onClick={handleUpload}
        disabled={!photo}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg disabled:bg-gray-300"
      >
        Upload
      </button>
    </div>
  );
}