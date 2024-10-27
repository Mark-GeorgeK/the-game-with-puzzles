import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ totalPuzzles, currentPuzzleIndex }) => {
    return (
        <div className="progress-bar">
            {Array.from({ length: totalPuzzles }).map((_, index) => (
                <div key={index} className="progress-step">
                    <div className={`circle ${index <= currentPuzzleIndex ? 'completed' : ''}`}>
                        {index < currentPuzzleIndex ? '✓' : ''}
                    </div>
                    {index < totalPuzzles - 1 && <div className="line" />}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
