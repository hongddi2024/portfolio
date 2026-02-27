"use client";

import { useEffect, useState, useCallback } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase";

const STORAGE_KEY = "portfolio-likes";

function getLikedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function persistLikedSet(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useLikes(imageId: string) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getLikedSet().has(imageId));
    const likesRef = ref(db, `likes/${imageId}`);
    return onValue(likesRef, (snap) => {
      setCount(snap.val() ?? 0);
    });
  }, [imageId]);

  const toggle = useCallback(() => {
    const likesRef = ref(db, `likes/${imageId}`);
    const set = getLikedSet();
    const wasLiked = set.has(imageId);

    runTransaction(likesRef, (current) => {
      const val = current ?? 0;
      return wasLiked ? Math.max(0, val - 1) : val + 1;
    });

    if (wasLiked) {
      set.delete(imageId);
    } else {
      set.add(imageId);
    }
    persistLikedSet(set);
    setLiked(!wasLiked);
  }, [imageId]);

  return { count, liked, toggle };
}
