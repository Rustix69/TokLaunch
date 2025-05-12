import React from 'react';
import TokenLaunchpad from '../components/TokenLaunchpad';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop')` }}>
      <div className="relative z-10 w-full max-w-2xl p-8 backdrop-blur-lg bg-white/30 rounded-lg shadow-xl">
        <TokenLaunchpad />
      </div>
    </div>
  );
};

export default Index;
