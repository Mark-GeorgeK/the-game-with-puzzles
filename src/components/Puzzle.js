import React from 'react';

function Puzzle({ puzzle, onCheckAnswer }) {
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckAnswer(answer);
    setAnswer(''); // Clear answer after submission
  };

  return (
    <div>
      <img src={puzzle.imageUrl} alt="Puzzle" />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="Your answer" 
          required 
        />
        <button type="submit">Check Answer</button>
      </form>
    </div>
  );
}

export default Puzzle;
