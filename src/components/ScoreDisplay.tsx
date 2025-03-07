"use client";

interface ScoreProps {
  scores: {
    score: number;
    feedback: string;
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
    total: number;
  } | null;
}

export default function ScoreDisplay({ scores }: ScoreProps) {
  if (!scores) return null;

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold mb-2">Your IELTS Speaking Score</h2>
      <p>Fluency & Coherence: {scores.fluency.toFixed(1)}</p>
      <p>Lexical Resource: {scores.lexical.toFixed(1)}</p>
      <p>Grammatical Range: {scores.grammar.toFixed(1)}</p>
      <p>Pronunciation: {scores.pronunciation.toFixed(1)}</p>
      <h3 className="mt-2 text-lg font-bold">Total: {scores.total.toFixed(1)} / 10</h3>
    </div>
  );
}
