import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import '../styles/leaderboard.css'

const Leaderboard = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'teams'), orderBy('puzzlesSolved', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const teamsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeams(teamsData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Puzzles Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={team.id}>
                            <td>{index + 1}</td>
                            <td>{team.player1} - {team.player2}</td>
                            <td>{team.puzzlesSolved}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
