import { useState, useCallback } from "react";

import { TETROMINOS, getRandomTetramino } from "../utils/tetrominos";

import { STAGE_WIDTH, hasCollision } from "../utils/gameHelpers";

const initialPosition = {
  x: STAGE_WIDTH / 2 - 1,
  y: 0
};

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: initialPosition,
    tetromino: TETROMINOS.empty.shape,
    collided: false,
    // direction: Math.random() > 0.5 ? 1 : -1
  });

  const rotateTetromino = (tetromino, direction) => {
    // строки сделать столбцами (транспонировать)
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map(column => column[index])
    );
    // развернуть каждую строку в обратном порядке
    if (direction > 0) {
      // по часовой стрелке
      return rotatedTetromino.map(row => row.reverse());
    }
    // против часовой стрелки
    return rotatedTetromino.reverse();
  };

  const rotatePlayer = (stage, direction) => {
    console.log(direction);
    // грязный хак для глубокого клонирования
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotateTetromino(clonedPlayer.tetromino, direction);

    // без вращения при столкновении (без отскока)

    if (hasCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.tetromino = player.tetromino;
    }

    // вращение при столкновении (с отскоком)
    /* const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (hasCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotateTetromino(clonedPlayer.tetromino, -direction)
        clonedPlayer.pos.x = pos;
        return;
      }
    } */

    setPlayer(clonedPlayer);
  };

  const updatePlayerPosition = ({ x, y, collided }) => {
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
      collided: false,
      // вращение в рандомную сторону
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }, []);
  return [player, updatePlayerPosition, resetPlayer, rotatePlayer];
};
