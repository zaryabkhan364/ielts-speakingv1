"use client";

export function analyzeSpeech(transcript: string) {
    const words = transcript.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
  
    // Basic scoring logic (to be improved)
    const fluencyScore = Math.max(0, 10 - (wordCount < 20 ? (20 - wordCount) * 0.5 : 0));
    // const f
    // const lexicalScore
    const lexicalScore = Math.min(10, words.length / 5); // Adjust based on vocab analysis
    const grammarScore = 7; // Placeholder - will improve with NLP
    const pronunciationScore = 8; // Placeholder - will integrate API later
  
    return {
      score: Number,
      feedback: "",
      fluency: fluencyScore,
      lexical: lexicalScore,
      grammar: grammarScore,
      pronunciation: pronunciationScore,
      total: (fluencyScore + lexicalScore + grammarScore + pronunciationScore) / 4,
    };
  }
  