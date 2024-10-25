import React from 'react';
import PlayerForm from '../components/PlayerForm';
import '../styles/HomePage.css'

function HomePage() {
  return (
    <div className="home-container">
      <h2 className="title">Welcome to the Puzzles Game!</h2>
      <PlayerForm />
    </div>
  );
}

export default HomePage;
