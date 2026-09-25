import { promptLevels } from '@/lib/data/promptchallenge';
import PromptChallengeMasterView from '@/components/activities/prompt-challenge/prompchallengemasterview';

export default async function PromptChallengePage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;
  const levelData = promptLevels.find((level) => level.id === parseInt(levelId));

  if (!levelData) {
    return <div className="text-red-500 text-center mt-10 text-2xl font-bold">Level Not Found!</div>;
  }

  return <PromptChallengeMasterView levelData={levelData} />;
}
