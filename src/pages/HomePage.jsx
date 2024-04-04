// src/pages/HomePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { userDocumentId } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Devdle</h1>
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl">
        <h2 className="text-3xl font-semibold mb-3">Patch Notes:</h2>
        <article className="space-y-2">
          <p><span className="font-bold">Update 1.2.0:</span> Added new features to the Daily Challenge.</p>
          <p><span className="font-bold">Update 1.1.5:</span> Improved leaderboard functionality.</p>
          <p><span className="font-bold">Update 1.1.0:</span> Launched Weekly and Monthly Challenges.</p>
          {/* Add more patch notes here */}
        </article>
      </section>
      <footer className="mt-6">
        {userDocumentId ? (
          <a href={`/profile/${userDocumentId}`} className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out">View Profile</a>
        ) : (
          <a href="/game/daily" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out">Start playing</a>
        )}
      </footer>
    </div>
  );
};

export default HomePage;
