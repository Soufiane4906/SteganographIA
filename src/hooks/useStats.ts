import { useState, useEffect } from 'react';
import { getStats } from '../services/api';

interface Stats {
  totalImages: number;
  aiImages: number;
  signedImages: number;
  authenticImages: number;
  weeklyData: {
    date: string;
    total: number;
    ai: number;
    signed: number;
  }[];
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};