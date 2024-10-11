// Mock service to demonstrate functionality; replace with actual logic
const puzzles = [
    { id: 1, imageUrl: 'https://via.placeholder.com/300', answer: 'Answer 1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/300', answer: 'Answer 2' },
    // Add more puzzles as needed
  ];
  
  const getPuzzle = (index) => {
    return puzzles[index] || null;
  };
  
  const checkAnswer = (puzzle, answer) => {
    return puzzle.answer.toLowerCase() === answer.toLowerCase();
  };
  
  export { getPuzzle, checkAnswer };
  