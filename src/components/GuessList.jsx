import React from 'react';

const GuessList = ({ guesses }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold text-center">Your Guesses:</h3>
      {guesses.length > 0 ? (
        <ul className="list-disc list-inside">
          {guesses.map((guess, index) => (
            <li key={index} className="text-gray-300 text-center p-1">
              {guess}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No guesses yet.</p>
      )}
    </div>
  );
};

export default GuessList;
