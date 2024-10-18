import React from 'react';
import PlayerForm from '../components/PlayerForm';
import '../styles/HomePage.css'

function HomePage() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h2 className="title">Welcome to The Game With Puzzles</h2>
        <PlayerForm />
      </div>
    </div>
  );
}

export default HomePage;
