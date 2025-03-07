"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { analyzeSpeech } from "@/components/Scoring";
import SpeechButton from "@/components/SpeechButton";
import TranscriptDisplay from "@/components/TranscriptDisplay";
import ScoreDisplay from "@/components/ScoreDisplay";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { transcript, listening, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  // Define the expected type correctly
  type ScoreData = {
    score: number;
    feedback: string;
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
    total: number;
  };

  const [scores, setScores] = useState<ScoreData | null>(null);

  const handleStopListening = () => {
    stopListening();
    if (transcript.trim().length > 0) {
      const analysis = analyzeSpeech(transcript);

      // Ensure `analysis` contains all expected properties
      setScores({
        score: analysis.total ?? 0, // Ensure `total` exists
        feedback: analysis.feedback ?? "Your feedback here",
        fluency: analysis.fluency ?? 0,
        lexical: analysis.lexical ?? 0,
        grammar: analysis.grammar ?? 0,
        pronunciation: analysis.pronunciation ?? 0,
        total: analysis.total ?? 0,
      });
    }
  };

  const handleReset = () => {
    resetTranscript();
    setScores(null);
  };

  // Prevent hydration mismatch
  if (!isClient) return <div />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">IELTS Speaking Mock Test</h1>
      <SpeechButton
        listening={listening}
        startListening={startListening}
        stopListening={handleStopListening}
        pauseListening={() => {}}
        transcript={transcript}
      />
      <TranscriptDisplay transcript={transcript} />
      <ScoreDisplay scores={scores} />

      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Reset Test
      </button>
    </div>
  );
}
