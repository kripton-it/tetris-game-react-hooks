import React from 'react';
import { StyledStartButton } from './styles/styled-start-button'

const StartButton = ({handleClick}) => {
  return (
    <StyledStartButton type="button" onClick={handleClick}>
      Start Game
    </StyledStartButton>
  );
};

export default StartButton;