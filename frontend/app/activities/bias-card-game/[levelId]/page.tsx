import React from 'react';
// Yahan ensure karna ki path tumhare components folder se perfectly match kare
import BiasGameContainer from '@/components/activities/bias-card-game/biasgamecontainer';

export default function BiasCardGameLevelPage({ params }: { params: { levelId: string } }) {
  return (
    <div className="min-h-screen w-full bg-white">
      <BiasGameContainer levelId={params.levelId} />
    </div>
  );
}