import React from "react";

const HintDisplay = ({ hints }) => {
  return (
    <div className="mb-4">
      {hints.map((hint, index) => (
        <div key={index} className="bg-gray-700 text-gray-300 p-2 rounded my-1">
          {hint}
        </div>
      ))}
    </div>
  );
};

export default HintDisplay;
