import { useState, useEffect } from "react";
import { createStage, STAGE_WIDTH } from "../utils/gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const rowsReducer = (acc, row) => {
      if (row.every(cell => cell[0] !== "empty")) {
        setRowsCleared(rows => rows + 1);
        acc.unshift(new Array(STAGE_WIDTH).fill(["empty", "clear"]))
      } else {
        acc.push(row);
      }
      return acc;
    }

    const sweepRows = (newStage) => newStage.reduce(rowsReducer, []);

    const updateStage = prevStage => {
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? ["empty", "clear"] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]); // ???

  return [stage, setStage, rowsCleared];
};
