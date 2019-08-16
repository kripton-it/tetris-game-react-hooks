import React from 'react';

import { StyledDisplay } from './styles/styled-display'

const Display = ({isGameOver, text}) => {
  return (
    <StyledDisplay isGameOver={isGameOver}>
      {text}
    </StyledDisplay>
  );
};

export default Display;