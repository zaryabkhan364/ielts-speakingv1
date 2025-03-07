"use client";
import { useState } from "react";
import { analyzeSpeech } from "@/components/Scoring";

interface SpeechButtonProps {
  listening: boolean;
  startListening: () => void;
  pauseListening: () => void;
  stopListening: () => void;
  transcript: string;
}

export default function SpeechButton({
  listening,
  startListening,
  pauseListening,
  stopListening,
  transcript,
}: SpeechButtonProps) {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [paused, setPaused] = useState(false);

  const handleStop = async () => {
    stopListening();
    setPaused(false); // Reset pause state

    // Analyze transcript
    if (transcript.trim().length > 0) {
      const result = await analyzeSpeech(transcript);
      setScore(result.score);
      setFeedback(result.feedback);
    }
  };

  const handlePauseResume = () => {
    if (paused) {
      startListening();
    } else {
      pauseListening();
    }
    setPaused(!paused);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={listening ? handlePauseResume : startListening}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {listening ? (paused ? "Resume" : "Pause") : "Start Speaking"}
      </button>

      {listening && (
        <button
          onClick={handleStop}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop
        </button>
      )}

      {score !== null && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <p>Score: {score.toFixed(2)}</p>
          <p>Feedback: {feedback}</p>
        </div>
      )}
    </div>
  );
}
