import Link from "next/link";


export default function Header() {
  if (typeof window === 'undefined') return null; // Ensure safe execution on the server

  return (
    <header className="fixed top-0 left-0 w-full bg-red-600 bg-opacity-80 text-white shadow-md backdrop-blur-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">IELTS Speaking Mock Test</h1>
        <nav className="flex space-x-4">
          <Link href="/beginner-questions" className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-200 transition">
            Beginner Questions
          </Link>
          <Link href="/talk-on-topic" className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-200 transition">
            Talk on a Topic
          </Link>
          <Link href="/random-questions" className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-200 transition">
            Random Questions
          </Link>
          <Link href="/give-a-mock" className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-200 transition">
            Give a Mock
          </Link>
          
        </nav>
      </div>
    </header>
  );
}
