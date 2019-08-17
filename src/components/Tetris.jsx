import React, { useState } from "react";

import { createStage, hasCollision } from "../utils/gameHelpers";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/styled-tetris";

// Custom hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  // console.log("Tetris component");
  // console.log("******************************");
  const [dropTime, setDropTime] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

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
    setDropTime(1000);
    setLevel(0);
    setRows(0);
    setScore(0);
  };

  const drop = () => {
    if (rows >= (level + 1) * 10) {
      setLevel(prevLevel => prevLevel + 1);
      // setDropTime(1000 / (level + 1) + 200);
      setDropTime(1000 * 0.8 ** level)
    }

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

  const keyUp = ({keyCode}) => {
    if (!isGameOver) {
      if (keyCode === 40) {
        setDropTime(1000 * 0.9 ** level)
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
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

  useInterval(drop, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={move} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {isGameOver ? (
            <Display isGameOver={isGameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}

          <StartButton handleClick={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
