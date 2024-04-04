import React from "react";

const WordInput = ({ guess, setGuess, onGuessSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim()) { // Only submit if there's a non-empty guess
      onGuessSubmit(guess);
      setGuess(''); // Reset guess after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="text-black p-2 rounded"
        placeholder="Enter your guess"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        disabled={!guess.trim()} // Disable button if guess is empty or only contains whitespace
      >
        Guess
      </button>
    </form>
  );
};

export default WordInput;
