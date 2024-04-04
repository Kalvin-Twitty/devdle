import React, { useState, useEffect } from 'react';
import { getTodaysWord } from '../firebase/gameLogic';

const DailyChallenge = () => {
  const [dailyWord, setDailyWord] = useState(null);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [hints, setHints] = useState([]);
  const [gameStatus, setGameStatus] = useState('loading'); // 'loading', 'ongoing', 'won', 'lost'
  const maxAttempts = 5; // Maximum number of attempts

  useEffect(() => {
    const fetchWord = async () => {
      const wordData = await getTodaysWord();
      if (wordData) {
        setDailyWord(wordData);
        setGameStatus('ongoing');
      } else {
        setGameStatus('error');
      }
    };

    fetchWord();
  }, []);

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    if (gameStatus !== 'ongoing' || !currentGuess.trim()) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (dailyWord && currentGuess.toLowerCase() === dailyWord.word.toLowerCase()) {
      setGameStatus('won');
    } else {
      setHints(dailyWord.hints.slice(0, newGuesses.length)); // Accumulate hints
      setCurrentGuess('');

      if (newGuesses.length >= maxAttempts) {
        setGameStatus('lost');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      {gameStatus === 'loading' && <p className="animate-bounce">Loading daily challenge...</p>}
      {gameStatus === 'error' && <p className="text-red-500">Failed to load the daily challenge. Please try again later.</p>}
      {gameStatus === 'ongoing' && dailyWord && (
        <>
          <h2 className="text-3xl font-bold mb-4 text-teal-500">Word of the Day Challenge</h2>
          <p className="mb-4 text-lg">Attempts left: {maxAttempts - guesses.length}</p>
          <form onSubmit={handleGuessSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="Enter your guess"
              disabled={gameStatus !== 'ongoing'}
              className="text-White p-2 rounded bg-gray-700 border-2 border-gray-600 focus:border-blue-500 outline-none"
            />
            <button type="submit" className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-lg">Guess</button>
          </form>
          <div className="my-4">
            <p className="font-bold">Guesses:</p>
            <ul className="list-inside list-disc">
              {guesses.map((guess, index) => (
                <li key={index} className="my-1 bg-gray-700 p-2 rounded">{guess}</li>
              ))}
            </ul>
          </div>
          <div className="hints">
            {hints.map((hint, index) => (
              <p key={index} className="bg-gray-700 p-2 rounded mt-2 shadow">{hint}</p>
            ))}
          </div>
        </>
      )}
      {gameStatus === 'won' && <p className="text-green-400 text-xl mt-4">Congratulations! You've guessed the word: {dailyWord.word}</p>}
      {gameStatus === 'lost' && <p className="text-red-400 text-xl mt-4">Out of attempts! The word was {dailyWord.word}.</p>}
    </div>
  );
};

export default DailyChallenge;
