// src/lib/firebase.ts
"use client";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  type CollectionReference,
  type DocumentData,
  writeBatch,   // ← ADDED
  doc,
  addDoc,           // ← ADD
  serverTimestamp,  // ← ADD
  getDocs,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";   
// -------------------------------------------------------------------
// 1. Firebase Config
// -------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD_N1NLrRVXJsvsTUKvCXqmw-ujWDpXwZQ",
  authDomain: "waitlist-f66db.firebaseapp.com",
  projectId: "waitlist-f66db",
  storageBucket: "waitlist-f66db.firebasestorage.app",
  messagingSenderId: "747096131747",
  appId: "1:747096131747:web:ef6cb82fd2631eed635716",
  measurementId: "G-DQN53DGHS2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// -------------------------------------------------------------------
// 2. Player Type (id = Firestore doc ID)
// -------------------------------------------------------------------
export type Player = {
  id?: string;
  name: string;
  score: number;
  rank?: number;
  timestamp?: any;
};

// -------------------------------------------------------------------
// 3. Collection Reference
// -------------------------------------------------------------------
export const leaderboardRef = collection(db, "leaderboard") as CollectionReference<Player>;

// -------------------------------------------------------------------
// 4. Real-time Hook – FIXED: No duplicate 'id'
// -------------------------------------------------------------------
export const useLeaderboard = (callback: (players: Player[]) => void) => {
  const q = query(leaderboardRef, orderBy("score", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const players: Player[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,           // From Firestore document ID
        name: data.name,
        score: data.score,
        rank: data.rank,
      };
    });
    callback(players);
  });

  return unsubscribe;
};
export { writeBatch, doc,addDoc,serverTimestamp,getDocs, getFunctions, httpsCallable };