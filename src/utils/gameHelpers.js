export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WIDTH).fill(["empty", "clear"]);
  });

export const hasCollision = (player, stage, { x, y }) => {
  for (let j = 0; j < player.tetromino.length; j++) {
    for (let i = 0; i < player.tetromino[0].length; i++) {
      // проверка на ячейку фигуры
      if (player.tetromino[j][i] !== 0) {
        if (
          // проверка на нахождение внутри области по высоте
          !stage[j + player.pos.y + y] ||
          // проверка по ширине
          !stage[j + player.pos.y + y][i + player.pos.x + x] ||
          // проверка на столкновение с существующими фигурами
          stage[j + player.pos.y + y][i + player.pos.x + x][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
};
