"use client"; // Ensure this is at the top

import dynamic from "next/dynamic";

// Dynamically import the Home component with SSR disabled
const HomeClient = dynamic(() => import("@/components/Home"), { ssr: false });

export default function Page() {
  return <HomeClient />;
}
