"use client";

import { use, useState, useEffect, useRef } from 'react';
import LevelLayout from '../../../../components/activities/train-the-robot/LevelLayout';
import { trainRobotLevels } from '../../../../lib/trainRobotLevels';
import { useGTMPrediction } from '../../../../hooks/useGTMPrediction';

type RobotState = 'sleeping' | 'analyzing' | 'excited';

export default function TrainRobotLevelPage({ params }: { params: Promise<{ levelId: string }> }) {
  const resolvedParams = use(params);
  const levelId = parseInt(resolvedParams.levelId, 10);
  const level = trainRobotLevels.find(l => l.id === levelId);

  const { webcamRef, topPrediction, confidence, cameraError } = useGTMPrediction(
    level?.modelBasePath || '',
    (level?.modelType as 'image' | 'pose') || 'image',
    !!level
  );

  const [progress, setProgress] = useState(0);
  const [robotState, setRobotState] = useState<RobotState>('sleeping');
  const [isSuccess, setIsSuccess] = useState(false);

  // Keep a ref so the interval callback always reads the latest confidence
  const confidenceRef = useRef(confidence);
  useEffect(() => {
    confidenceRef.current = confidence;
  }, [confidence]);

  // Derive robotState from confidence
  useEffect(() => {
    if (confidence >= 0.85) {
      setRobotState('excited');
    } else if (confidence >= 0.40) {
      setRobotState('analyzing');
    } else {
      setRobotState('sleeping');
    }
  }, [confidence]);

  // Tick progress every 100ms based on confidence
  useEffect(() => {
    if (isSuccess) return; // Stop ticking once mission is passed

    const interval = setInterval(() => {
      const c = confidenceRef.current;
      setProgress(prev => {
        const next = c > 0.85
          ? Math.min(prev + 2, 100)
          : c < 0.50
            ? Math.max(prev - 1, 0)
            : prev;

        if (next >= 100) {
          setIsSuccess(true);
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSuccess]);

  if (!level) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-10 text-center text-red-500 font-bold text-xl">Level Not Found</div>
      </div>
    );
  }

  return (
    <LevelLayout 
      levelId={levelId}
      title={level.title}
      mission={level.mission}
      webcamRef={webcamRef}
      prediction={topPrediction}
      confidence={confidence}
      progress={progress}
      robotState={robotState}
      isSuccess={isSuccess}
      cameraError={cameraError}
    />
  );
}
