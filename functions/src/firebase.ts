// functions/src/index.ts
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import {
  getFirestore,
  WriteBatch,
  DocumentReference,
} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const seedLeaderboard = functions.https.onCall(async (request) => {
  // OPTIONAL: Remove auth check if you want anyone to call
  // if (!request.auth) {
  //   throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  // }

  const batch: WriteBatch = db.batch();

  const demoPlayers = [
    { name: "Alex",   score: 950 },
    { name: "Priya",  score: 880 },
    { name: "Rahul",  score: 820 },
    { name: "Sneha",  score: 780 },
    { name: "Vikram", score: 710 },
  ];

  demoPlayers.forEach((player) => {
    // Auto‑ID + unique name
    const customId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ref: DocumentReference = db.collection("leaderboard").doc(customId);
    batch.set(ref, player);
  });

  await batch.commit();

  return { success: true, message: "Demo data seeded!" };
});