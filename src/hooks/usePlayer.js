import { useState, useCallback } from "react";

import { getRandomTetramino } from "../utils/tetrominos";

import { STAGE_WIDTH } from '../utils/gameHelpers'

const initialPosition = {
  x: STAGE_WIDTH / 2 - 1,
  y: 0
};

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: initialPosition,
    tetromino: getRandomTetramino().shape,
    collided: false
  });
  const updatePlayerPosition = ({x, y, collided}) => {
    setPlayer(prev => ({
      ...prev,
      collided,
      pos: {
        x: prev.pos.x + x,
        y: prev.pos.y + y
      }
    }));
  };
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: initialPosition,
      tetromino: getRandomTetramino().shape,
      collided: false
    });
  }, []);
  return [player, updatePlayerPosition, resetPlayer];
};
