// // src/components/AnimatedLeaderboardSection.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { leaderboardRef, addDoc, serverTimestamp, getDocs } from "@/lib/firebase";
// import { onSnapshot, query, orderBy } from "firebase/firestore";
// import { motion, AnimatePresence } from "framer-motion";

// interface Player {
//   id: string;
//   name: string;
//   score: number;
// }

// export default function AnimatedLeaderboardSection() {
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [seeding, setSeeding] = useState(false);

//   // Auto-seed
//   useEffect(() => {
//     const seed = async () => {
//       const snap = await getDocs(leaderboardRef);
//       if (snap.empty) {
//         setSeeding(true);
//         const demo = [
//           { name: "Alex",   score: 9999 },
//           { name: "Jordan", score: 8750 },
//           { name: "Sam",    score: 7200 },
//           { name: "Taylor", score: 6500 },
//           { name: "Casey",  score: 5800 },
//         ];
//         for (const p of demo) {
//           await addDoc(leaderboardRef, { ...p, timestamp: serverTimestamp() });
//         }
//         setSeeding(false);
//       }
//     };
//     seed();
//   }, []);

//   // Real-time
//   useEffect(() => {
//     const q = query(leaderboardRef, orderBy("score", "desc"));
//     const unsubscribe = onSnapshot(q, (snap) => {
//       const data = snap.docs
//         .map((doc) => {
//           const d = doc.data();
//           if (typeof d.name === "string" && typeof d.score === "number") {
//             return { id: doc.id, name: d.name, score: d.score };
//           }
//           return null;
//         })
//         .filter((p): p is Player => p !== null);
//       setPlayers(data);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//       className="flex items-center justify-center min-h-screen bg-linear-to-br from-cyan-500 to-blue-700 p-8"
//     >
//       <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full">
//         <motion.h2
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl font-bold text-center text-white mb-6"
//         >
//           Global Leaderboard
//         </motion.h2>

//         {loading ? (
//           <div className="text-center text-white">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               className="w-10 h-10 border-4 border-t-transparent border-white rounded-full mx-auto"
//             />
//             <p className="mt-2">{seeding ? "Seeding..." : "Loading..."}</p>
//           </div>
//         ) : (
//           <AnimatePresence>
//             <motion.ol className="space-y-3">
//               {players.map((p, i) => (
//                 <motion.li
//                   key={p.id}
//                   layout
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="flex justify-between items-center p-3 bg-white/10 rounded-xl text-white"
//                 >
//                   <span className="font-semibold">
//                     {i + 1}. {p.name}
//                   </span>
//                   <motion.span
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: 1 }}
//                     className="font-bold"
//                   >
//                     {p.score.toLocaleString()}
//                   </motion.span>
//                 </motion.li>
//               ))}
//             </motion.ol>
//           </AnimatePresence>
//         )}
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { leaderboardRef, addDoc, serverTimestamp, getDocs } from "@/lib/firebase";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

export interface Player {
  id: string;
  name: string;
  score: number;
  timestamp: any;
}

export default function AnimatedLeaderboardSection() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  // Auto-seed
  useEffect(() => {
    const seed = async () => {
      const snap = await getDocs(leaderboardRef);
      if (snap.empty) {
        setSeeding(true);
        const demo = [
          { name: "Alex",   score: 9999 },
          { name: "Jordan", score: 8750 },
          { name: "Sam",    score: 7200 },
          { name: "Taylor", score: 6500 },
          { name: "Casey",  score: 5800 },
        ];
        for (const p of demo) {
          await addDoc(leaderboardRef, { ...p, timestamp: serverTimestamp() });
        }
        setSeeding(false);
      }
    };
    seed();
  }, []);

  // Real-time
  useEffect(() => {
    const q = query(leaderboardRef, orderBy("score", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((doc) => {
          const d = doc.data();
          if (typeof d.name === "string" && typeof d.score === "number") {
            return { id: doc.id, name: d.name, score: d.score };
          }
          return null;
        })
        .filter((p): p is Player => p !== null);
      setPlayers(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="flex-items justify-center bg-linear-to-br from-gray-200 to-blue-500 p-8 rounded-3xl shadow-2xl max-w-md w-full text-white "
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-6"
      >
        Global Leaderboard
      </motion.h2>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-4 border-t-transparent border-white rounded-full mx-auto"
          />
          <p className="mt-2">{seeding ? "Seeding..." : "Loading..."}</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {players.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <p className="text-xl mb-6 opacity-80">No players yet</p>
              <motion.button
                onClick={async () => {
                  setSeeding(true);
                  await addDoc(leaderboardRef, { name: "Test", score: 100 });
                  setSeeding(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
              >
                Seed Now
              </motion.button>
            </motion.div>
          ) : (
            <motion.ol
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {players.map((player, index) => (
                  <motion.li
                    key={player.id}
                    layout
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex justify-between p-5 rounded-2xl backdrop-blur-md text-white bg-white/10"
                  >
                    <span className="text-lg font-semibold">{index + 1}. {player.name}</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold"
                    >
                      {player.score.toLocaleString()}
                    </motion.span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}