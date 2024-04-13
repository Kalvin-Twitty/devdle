import React from 'react';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="rounded-lg p-8 shadow-lg bg-gray-800 text-center max-w-sm w-full mb-8">
        <h1 className="text-4xl text-teal-400 font-bold mb-6">About Codele</h1>
        <p className="text-white mb-6">
          Codele is the best place to sharpen your coding skills daily! Challenge yourself with daily, weekly, and monthly coding challenges.
        </p>
        <p className="text-white mb-6">
          Earn points, climb the leaderboard, and become a better coder every day. Join Codele now and level up your coding game!
        </p>
        <p className="text-white mb-6">
          Codele - Your daily coding companion.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
