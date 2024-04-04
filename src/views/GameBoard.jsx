import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WordInput from '../components/WordInput'; // Ensure this component is set up for input handling
import GuessList from '../components/GuessList'; // Displays guesses
import HintDisplay from '../components/HintDisplay'; // Optional: Component to display hints
import { getTodaysWord, updateStreak } from '../firebase/gameLogic';

const GameBoard = () => {
  const { currentUser } = useAuth();
  const [dailyWordObj, setDailyWordObj] = useState(null);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [hintIndex, setHintIndex] = useState(0); // Tracks which hint to show next
  const [gameStatus, setGameStatus] = useState('loading'); // Added 'loading' status

  useEffect(() => {
    getTodaysWord().then(wordObj => {
      if (wordObj) {
        setDailyWordObj(wordObj);
        setGameStatus('ongoing');
      } else {
        console.error("Failed to fetch today's word.");
        setGameStatus('error');
      }
    }).catch(error => {
      console.error("Error fetching today's word:", error);
      setGameStatus('error');
    });
  }, [currentUser]);

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (gameStatus !== 'ongoing' || !currentGuess.trim()) return;

    if (currentGuess.toLowerCase() === dailyWordObj.word.toLowerCase()) {
      setGameStatus('won');
      updateStreak(currentUser, true).catch(console.error);
    } else {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');
      // Show the next hint
      if (hintIndex < dailyWordObj.hints.length) {
        setHintIndex(hintIndex + 1);
      }
      if (guesses.length + 1 >= 5) { // +1 to include the current guess
        setGameStatus('lost');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {gameStatus === 'ongoing' && (
        <>
          <form onSubmit={handleGuessSubmit}>
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="Enter your guess"
              disabled={gameStatus !== 'ongoing'}
            />
            <button type="submit">Guess</button>
          </form>
          <GuessList guesses={guesses} />
          {hintIndex > 0 && <p>Hint: {dailyWordObj.hints[hintIndex - 1]}</p>}
        </>
      )}
      {gameStatus === 'won' && <div>Congratulations! You've guessed the word: {dailyWordObj.word}</div>}
      {gameStatus === 'lost' && <div>Out of attempts! The word was {dailyWordObj.word}.</div>}
      {gameStatus === 'loading' && <div>Loading...</div>}
      {gameStatus === 'error' && <div>Failed to load the challenge. Please try again later.</div>}
    </div>
  );
};

export default GameBoard;
