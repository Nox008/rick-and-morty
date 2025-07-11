import Link from 'next/link';
import { VscChevronRight } from "react-icons/vsc";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0c10] to-[#1a1f2b] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-cyan-300 tracking-tighter">
          The Rick & Morty Multiverse
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12">
          An interdimensional browser for every character you've ever wanted to know about. And some you didn't.
        </p>

        {/* The Portal Link */}
        <Link
          href="/characters"
          className="group relative flex items-center justify-center w-64 h-64"
        >
          {/* Swirling Portal Effect */}
          <div className="absolute w-full h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-spin-slow blur-[60px] opacity-70 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute w-3/4 h-3/4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-spin-slower blur-[40px] opacity-60"></div>

          {/* Central Button */}
          <div className="relative flex flex-col items-center justify-center w-40 h-40 bg-gray-900 bg-opacity-60 backdrop-blur-sm border border-cyan-400/50 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300">
            <span className="font-semibold text-lg">Enter</span>
            <span className="text-cyan-300 text-sm">the Browser</span>
            <VscChevronRight className="absolute right-4 text-3xl text-cyan-400/70 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </Link>

        <p className="mt-12 text-sm text-gray-500">
          Warning: May contain traces of existential dread.
        </p>
      </div>
    </main>
  );
};

export default HomePage;