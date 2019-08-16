import React from 'react';

const StartButton = ({handleClick}) => {
  return (
    <button type="button" onClick={handleClick}>
      Start Game
    </button>
  );
};

export default StartButton;