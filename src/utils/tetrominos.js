export const TETROMINOS = {
  0: {
    shape: [[0]],
    color: "rgb(0, 0, 0)"
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ],
    color: "rgb(80, 227, 230)"
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ],
    color: "rgb(36, 95, 223)"
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ],
    color: "rgb(223, 153, 36)"
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ],
    color: "rgb(223, 255, 36)"
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ],
    color: "rgb(48, 211, 56)"
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0]
    ],
    color: "rgb(132, 61, 198)"
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0]
    ],
    color: "rgb(227, 78, 78)"
  }
};

export const getRandomTetramino = () => {
  const variants = "IJLOTSZ";
  const randomIndex = Math.floor(Math.random() * variants.length);
  return TETROMINOS[variants[randomIndex]];
}