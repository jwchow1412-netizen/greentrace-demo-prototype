'use client';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CheckInButton from './CheckInButton';

export default function BinStatusList({ userId }) {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const { data, error } = await supabase
          .from('bins')
          .select('*')
          .order('last_checked', { ascending: false });
        
        if (error) throw error;
        setBins(data);
      } catch (err) {
        console.error('获取垃圾桶列表失败:', err);
        setBins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBins();
  }, [supabase]);

  if (loading) return <p className="loading">加载垃圾桶状态中...</p>;

  return (
    <div className="bins-list">
      <h3>附近垃圾桶状态</h3>
      {bins.length === 0 ? (
        <p>暂无垃圾桶数据</p>
      ) : (
        <div className="bins-grid">
          {bins.map((bin) => (
            <div key={bin.id} className="bin-card">
              <h4>垃圾桶 #{bin.id}</h4>
              <p>位置: {bin.location || '未填写'}</p>
              <p>最后检查时间: {bin.last_checked 
                ? new Date(bin.last_checked).toLocaleString() 
                : '从未检查'}</p>
              <CheckInButton userId={userId} binId={bin.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}