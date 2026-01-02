'use client';
// 核心：必须默认导出一个React函数组件
export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f9ff' }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px', color: '#16a34a' }}>GreenTrace Demo</h1>
      <p style={{ textAlign: 'center' }}>Game-style eco platform (prototype)</p>
    </div>
  );
}