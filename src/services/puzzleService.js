const puzzles = [
  { id: 0, type: 'qr-code', next: 0, data: { answer: '2', rooms: '' } },
  { id: 1, type: 'qr-code', next: 0, data: { answer: '1', rooms: '' } },
  { id: 2, type: 'array', next: 0, data: [
    { imageUrl: '/puzzles/Picture1.png', answer: '164', rooms: '' },
    { imageUrl: '/puzzles/Picture2.jpg', answer: '042', rooms: '' },
    { imageUrl: '/puzzles/Picture3.jpg', answer: '394', rooms: '' },
    { imageUrl: '/puzzles/Picture4.png', answer: '021', rooms: '' },
    { imageUrl: '/puzzles/Picture5.jpg', answer: '846', rooms: '' },
    { imageUrl: '/puzzles/Picture6.jpg', answer: '394', rooms: '' },
    { imageUrl: '/puzzles/Picture7.jpg', answer: '764', rooms: '' },
    { imageUrl: '/puzzles/Picture8.jpg', answer: '315', rooms: '' },
    { imageUrl: '/puzzles/Picture9.jpg', answer: '264', rooms: '' },
    { imageUrl: '/puzzles/Picture10.jpg', answer: '820', rooms: '' }
  ]},
  { id: 3, type: 'text', next: 1, data: { clue: 'Hosea [ 15 * 2 / 3 + 1 : 1]', answer: 'egypt', rooms: 'the roof' } },
  { id: 4, type: 'text', next: 1, data: { clue: 'A Biblical city known as the City of David', answer: 'jerusalem', rooms: '108 & 109' } },
  { id: 5, type: 'image', next: 0, data: { imageUrl: '/clues/france.jpg', answer: 'france', rooms: '308 & 309' } },
  { id: 6, type: 'image', next: 1, data: { imageUrl: '/clues/spain.jpg', answer: 'spain', rooms: '302' } },
  { id: 7, type: 'image', next: 0, data: { imageUrl: '/clues/mexico.jpg', answer: 'mexico', rooms: '102 & 103' } },
  { id: 8, type: 'text', next: 1, data: { clue: 'Acts 17:16', answer: 'greece', rooms: '303 & 304' } },
  { id: 9, type: 'text', next: 0, data: { clue: 'A land of samba and carnival glee, I am known for my coffee and soccer, you see', answer: 'brazil', rooms: '104 & 105' } },
];

export default puzzles;
