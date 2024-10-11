import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/db';

const useFetchLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'leaderboard'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeaderboard(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
};

export default useFetchLeaderboard;
