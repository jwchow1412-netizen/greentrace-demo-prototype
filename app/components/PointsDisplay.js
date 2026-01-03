'use client';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function PointsDisplay({ userId }) {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('points')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        setPoints(data.points);
      } catch (err) {
        console.error('获取积分失败:', err);
        setPoints(0);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserPoints();
  }, [userId, supabase]);

  return (
    <div className="points-container">
      <h3>我的环保积分</h3>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="points-value">{points}</div>
      )}
      <p className="points-desc">每检查1个垃圾桶可获得50积分</p>
    </div>
  );
}