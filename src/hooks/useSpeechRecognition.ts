"use client";

import { useState, useRef, useEffect } from "react";

// Declare the SpeechRecognition type for TypeScript
type SpeechRecognition = {
  new (): {
    continuous: boolean;
    interimResults: boolean;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  };
};

// Declare missing global types
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognition;
    webkitSpeechRecognition?: SpeechRecognition;
  }

  // Define SpeechRecognitionEvent with results
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognition> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        recognitionRef.current = new SpeechRecognitionClass();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setTranscript(finalTranscript);
        };

        recognitionRef.current.onend = () => {
          console.log("Speech recognition stopped");
          setListening(false);
        };
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript(""); // Clear the transcript
  };

  return { transcript, listening, startListening, stopListening, resetTranscript };
}
