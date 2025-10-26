"use client";

import { useEffect, useState } from "react";
import { getBoards } from "@/lib/api";
import type { Board } from "../model";

export function useBoards() {
  const [data, setData] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBoards() {
      try {
        setIsLoading(true);
        const boards = await getBoards();
        if (mounted) {
          setData(boards);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch boards"));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchBoards();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
