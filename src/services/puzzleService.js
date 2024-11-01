const puzzles = [
  { id: 0, type: 'qr-code', next: 0, data: { answer: '2' } },
  { id: 1, type: 'qr-code', next: 0, data: { answer: '1' } },
  { id: 2, type: 'array', next: 0, data: [
    { imageUrl: '/puzzles/Picture1.png', answer: '164' },
    { imageUrl: '/puzzles/Picture2.jpg', answer: '042' },
    { imageUrl: '/puzzles/Picture3.jpg', answer: '394' },
    { imageUrl: '/puzzles/Picture4.jpg', answer: '021' },
    { imageUrl: '/puzzles/Picture5.jpg', answer: '846' },
    { imageUrl: '/puzzles/Picture6.jpg', answer: '394' },
    { imageUrl: '/puzzles/Picture7.jpg', answer: '764' },
    { imageUrl: '/puzzles/Picture8.jpg', answer: '315' },
    { imageUrl: '/puzzles/Picture9.jpg', answer: '264' },
    { imageUrl: '/puzzles/Picture10.jpg', answer: '820' }
  ]},
  { id: 3, type: 'text', next: 1, data: { clue: 'Hosea [ 15 * 2 / 3 + 1 : 1]', answer: 'egypt' } },
  { id: 4, type: 'text', next: 1, data: { clue: 'A Biblical city known as the City of David', answer: 'jerusalem' } },
  { id: 5, type: 'image', next: 0, data: { imageUrl: '/clues/france.jpg', answer: 'france' } },
  { id: 6, type: 'image', next: 1, data: { imageUrl: '/clues/spain.jpg', answer: 'spain' } },
  { id: 7, type: 'image', next: 0, data: { imageUrl: '/clues/mexico.jpg', answer: 'mexico' } },
  { id: 8, type: 'text', next: 1, data: { clue: 'Acts 17:16', answer: 'greece' } },
  { id: 9, type: 'text', next: 0, data: { clue: 'A land of samba and carnival glee, I am known for my coffee and soccer, you see', answer: 'brazil' } },
];

export default puzzles;
