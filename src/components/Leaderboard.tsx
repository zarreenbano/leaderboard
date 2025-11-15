// src/components/Leaderboard.tsx
"use client"; // Client component for hooks

import { useState, useEffect } from "react";
import { useLeaderboard, type Player } from "@/lib/firebase";

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = useLeaderboard((data) => {
      setPlayers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-[#d5edff] via-[#034056] to-[#1a759f] rounded-xl shadow-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">🏆 Leaderboard</h2>
      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`flex justify-between items-center p-4 rounded-lg transition-all border ${
              index === 0 ? "bg-yellow-50 border-yellow-400" :
              index === 1 ? "bg-gray-50 border-gray-400" :
              index === 2 ? "bg-orange-50 border-orange-400" :
              "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl text-gray-600">#{index + 1}</span>
              <span className="font-semibold text-gray-800">{player.name}</span>
            </div>
            <span className="font-bold text-indigo-600">{player.score} pts</span>
          </div>
        ))}
      </div>
      {players.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No players yet. Add some in Firebase!</p>
      )}
    </div>
  );
}