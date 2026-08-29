"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "house-search:favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved favorites once, on the client only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // ignore corrupt/unavailable storage
    } finally {
      setLoaded(true);
    }
  }, []);

  // Persist whenever favorites change (after the initial load).
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites, loaded]);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favorites.includes(id);
  }

  return { favorites, toggleFavorite, isFavorite };
}
