import React, { useState } from "react";

import { createStage, hasCollision } from "../utils/gameHelpers";

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
  // console.log("Tetris component");
  // console.log("******************************");
  const [dropTime, setDropTime] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = direction => {
    const movement = {
      x: direction,
      y: 0
    };

    if (!hasCollision(player, stage, movement)) {
      updatePlayerPosition({
        ...movement,
        collided: false
      });
    }
  };

  const startGame = () => {
    // reset all
    setStage(createStage());
    resetPlayer();
    setIsGameOver(false);
  };

  const drop = () => {
    const movement = {
      x: 0,
      y: 1
    };

    if (!hasCollision(player, stage, movement)) {
      updatePlayerPosition({
        ...movement,
        collided: false
      });
    } else if (player.pos.y < 1) {
      // проверка на Game Over
      setIsGameOver(true);
      setDropTime(null);
    } else {
      // фиксируем
      updatePlayerPosition({
        x: 0,
        y: 0,
        collided: true
      });
    }
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
      case 38:
        rotatePlayer(stage, player.direction);
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
