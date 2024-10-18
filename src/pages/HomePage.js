import React from 'react';
import PlayerForm from '../components/PlayerForm';
import '../styles/HomePage.css'

function HomePage() {
  return (
    <div className="home-container">
      <h2 className="title">Welcome to The Game <br></br>With Puzzles</h2>
      <PlayerForm />
    </div>
  );
}

export default HomePage;
