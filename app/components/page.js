'use client';
import { useSession } from '@supabase/auth-helpers-react';
import PointsDisplay from './components/PointsDisplay';
import BinStatusList from './components/BinStatusList';

export default function Home() {
  const { session } = useSession();
  const userId = session?.user.id;

  if (!userId) {
    return (
      <div className="auth-required">
        <h1>GreenTrace 环保打卡</h1>
        <p>请登录后参与垃圾桶检查打卡</p>
        {/* 此处可添加Supabase登录组件 */}
      </div>
    );
  }

  return (
    <main className="home-container">
      <h1>🌱 GreenTrace 环保打卡</h1>
      <PointsDisplay userId={userId} />
      <BinStatusList userId={userId} />
    </main>
  );
}