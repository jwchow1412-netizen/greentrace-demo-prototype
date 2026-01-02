'use client';
import { useState } from 'react';
import PhotoUploader from '../upload/PhotoUploader';
import PopupResult from '../ui/PopupResult';
import { classifyBin } from '@/lib/greenpt-pro';
import { supabase } from '@/lib/supabase';

export default function MapOverlayUpload({ isOpen, onClose, map }) {
  const [aiResult, setAiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    const center = map.getCenter();
    return { lng: center.lng, lat: center.lat };
  };

  const handleUpload = async (compressedPhoto) => {
    setIsLoading(true);
    try {
      // Upload to Supabase
      const { data: storageData } = await supabase.storage
        .from('photos')
        .upload(`bins/${Date.now()}-${compressedPhoto.name}`, compressedPhoto);
      const { data: urlData } = supabase.storage.from('photos').getPublicUrl(storageData.path);

      // Classify bin
      const loc = getCurrentLocation();
      const result = await classifyBin(urlData.publicUrl, loc);
      setAiResult(result);

      // Save to DB
      if (result.binType !== 'Unclassified') {
        await supabase.from('bins').insert([{
          location: `POINT(${loc.lng} ${loc.lat})`,
          bin_type: result.binType,
          image_url: urlData.publicUrl,
          coastal: loc.lat < 30,
        }]);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-4/5 max-w-md bg-white rounded-xl shadow-xl p-4 z-50">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Add Bin</h3>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      <PhotoUploader type="bin" onUploadComplete={handleUpload} />
      {isLoading && <p className="text-center py-2">Classifying...</p>}
      {aiResult && <PopupResult result={aiResult} onConfirm={onClose} />}
    </div>
  );
}