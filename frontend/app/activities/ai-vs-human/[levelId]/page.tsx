import React from "react";
import GameContainer from "@/components/activities/ai-vs-human/GameContainer";
import FeedbackModal from "@/components/activities/ai-vs-human/FeedbackModal";
import { aiVsHumanData } from "@/lib/data/aivsHuman";

export default async function AIVsHumanLevelPage({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) {
  const { levelId } = await params;
  const currentLevelData = aiVsHumanData.find((d) => d.id === parseInt(levelId));

  if (!currentLevelData) {
    return <div className="p-10 text-center">Level not found</div>;
  }

  return (
    <>
      <GameContainer levelData={currentLevelData} />
    </>
  );
}
