import React, { useState } from "react";

import { createStage } from "../utils/gameHelpers";

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
  const [player, updatePlayerPosition, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = direction => {
    updatePlayerPosition({
      x: direction,
      y: 0,
      collided: false
    });
  };

  const startGame = () => {
    // reset all
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPosition({
      x: 0,
      y: 1,
      collided: false
    });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (isGameOver) return;
    switch (keyCode) {
      case 37:
        movePlayer(-1);
        break;
      case 39:
        movePlayer(1);
        break;
      case 40:
        dropPlayer();
        break;
      default:
        break;
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={move}>
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

          <StartButton handleClick={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
