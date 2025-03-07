"use client"; // 👈 Add this at the top

type Props = {
  transcript: string;
};

export default function TranscriptDisplay({ transcript }: Props) {
  return (
    <div className="mt-4 p-4 bg-white shadow-lg rounded-lg w-full max-w-lg text-gray-800">
      <h2 className="text-lg font-semibold mb-2">Your Response:</h2>
      <p className="text-gray-600">{transcript || "Start speaking to see text here..."}</p>
    </div>
  );
}
