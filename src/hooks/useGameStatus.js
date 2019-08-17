import { useState, useEffect, useCallback } from "react";

const POINTS = [40, 100, 300, 1200];

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      // setScore(prevScore => prevScore + POINTS[rowsCleared - 1] * (level + 1));
      setScore(
        prevScore => prevScore + 100 * rowsCleared * (level + 1) * 2 ** (rowsCleared - 1)
      );
      setRows(prevRows => prevRows + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
