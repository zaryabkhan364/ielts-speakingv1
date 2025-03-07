
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Ielts Speaking Mocks",
  description: "Practice IELTS Speaking on the Go. Get AI-powered feedback, improve fluency, and boost your band score with real exam-style questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>  {/* ✅ Fix: Added children here */}
    </html>
  );
}
