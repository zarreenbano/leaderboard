// src/app/page.tsx
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <main className="  min-h-screen w-full

      bg-blend-color-dodge
  text-white flex items-center justify-center p-4">
      <div className="max-w-7xl w-full ">
        <h1 className="text-3xl font-bold text-center my-8 text-indigo-100">
          Global Leaderboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Left Side - Blank */}
          <div className="hidden md:block" aria-hidden="true"></div>

          {/* Center - Leaderboard */}
          <div className="flex justify-center ">
            <Leaderboard />
          </div>

          {/* Right Side - Blank */}
          <div className="hidden md:block" aria-hidden="true"></div>
        </div>
      </div>
    </main>
  );
}