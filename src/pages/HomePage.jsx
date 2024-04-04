import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Devdle</h1>
      <nav>
        <ul>
          <li><Link to="/game/daily">Daily Challenge</Link></li>
          <li><Link to="/game/weekly">Weekly Challenge</Link></li>
          <li><Link to="/game/monthly">Monthly Challenge</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/about">About</Link></li>
          
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;