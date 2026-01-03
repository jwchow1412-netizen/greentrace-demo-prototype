'use client';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function CheckInButton({ userId, binId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const supabase = useSupabaseClient();

  const handleCheckIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // 调用Supabase Edge函数完成签到验证
      const response = await fetch('/functions/v1/check-in-validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, bin_id: binId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '签到失败');
      
      setSuccess(true);
      // 签到成功后刷新积分和垃圾桶状态
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-in-card">
      <button 
        onClick={handleCheckIn}
        disabled={loading}
        className={`check-in-btn ${loading ? 'loading' : ''}`}
      >
        {loading ? '签到中...' : '检查垃圾桶 +50积分'}
      </button>
      
      {success && (
        <p className="success-msg">✅ 签到成功！已获得50积分</p>
      )}
      {error && (
        <p className="error-msg">❌ {error}</p>
      )}
    </div>
  );
}