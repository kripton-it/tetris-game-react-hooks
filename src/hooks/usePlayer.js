import { useState } from "react";

import { getRandomTetramino } from "../utils/tetrominos";

const initialPlayer = {
  pos: {
    x: 0,
    y: 0
  },
  tetromino: getRandomTetramino().shape,
  collided: false
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(initialPlayer);
  return [player, setPlayer];
};
