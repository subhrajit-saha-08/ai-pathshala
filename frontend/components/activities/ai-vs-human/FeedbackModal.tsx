"use client";

import React from "react";

interface FeedbackModalProps {
  isCorrect: boolean;
  explanation: string;
  takeaway: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function FeedbackModal({
  isCorrect,
  explanation,
  takeaway,
  onNext,
  onPrevious,
}: FeedbackModalProps) {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_12px_32px_-4px_rgba(74,64,88,0.12)] border border-secondary-fixed/40 transition-all" id="feedback-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex items-start gap-3.5">
          <div 
            className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${
              isCorrect ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-surface-variant text-on-surface-variant"
            }`}
            id="feedback-icon-box"
          >
            <span 
              className={`material-symbols-outlined text-[26px] ${
                isCorrect ? "text-on-secondary-fixed" : "text-on-surface-variant"
              }`}
              id="feedback-icon"
            >
              {isCorrect ? "verified" : "info"}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold" id="feedback-headline">
                {isCorrect ? "Wah! Zabardast Choice! 🎉" : "Tricky Tha! Dhyan Se Dekhiye... 🤔"}
              </h4>
              <span 
                className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                  isCorrect ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-surface-variant text-on-surface-variant"
                }`}
                id="feedback-badge"
              >
                {isCorrect ? "+150 XP Spark Stars" : "Detective Note"}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1" id="feedback-body">
              {explanation}
            </p>
            {takeaway && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 italic bg-surface-container p-2 rounded-md">
                <strong>Takeaway:</strong> {takeaway}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-center">
          {onPrevious && (
            <button 
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-all whitespace-nowrap border border-outline-variant/50" 
              type="button"
              onClick={onPrevious}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="hidden sm:inline">Previous</span>
            </button>
          )}
          {/* Next Question Transition Button */}
          <button 
            className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_16px_rgba(182,14,61,0.35)] hover:bg-primary-container hover:scale-105 active:scale-95 transition-all whitespace-nowrap" 
            id="next-question-btn" 
            type="button"
            onClick={onNext}
          >
            <span className="">Next Picture</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
