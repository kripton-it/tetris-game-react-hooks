import React, { useState } from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/styled-tetris";

// Custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  console.log("Tetris component");
  console.log("******************************");
  const [dropTime, setDropTime] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stage, setStage] = useStage();
  const [player, setPlayer] = usePlayer();

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {isGameOver ? (
            <Display isGameOver={isGameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}

          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
