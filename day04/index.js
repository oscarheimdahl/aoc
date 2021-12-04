const getLines = (filename = 'input.txt') => require('fs').readFileSync(filename).toString().trim().split('\n').map((x) => x);

const bingo = (b) => {
  for (let i = 0; i < 5; i++) {
    if (b.slice(i * 5, i * 5 + 5).join('') === 'xxxxx') return true;
    if (b[i] + b[i + 5] + b[i + 10] + b[i + 15] + b[i + 20] === 'xxxxx')
      return true;
  }
  return false;
};

const getPart1 = () => {
  const lines = getLines();
  const numbers = lines.splice(0, 2).join('').split(/,| /).filter((nr) => nr);
  let boards = lines.join().split(',,').map((line) => line.split(/,| /)).map((row) => row.filter((nr) => nr));
  let foundBoard = false;
  let lastNumber = -1;
  for (const number of numbers) {
    boards = boards.map((board) => {
      board = board.map((nr) => (nr == number ? 'x' : nr));
      if (bingo(board)) foundBoard = board;
      return board;
    });
    if (foundBoard) {
      lastNumber = number;
      break;
    }
  }
  return (lastNumber *foundBoard.filter((cell) => cell !== 'x').reduce((prev, cell) => prev + +cell, 0));
};

const getPart2 = () => {
  const lines = getLines();
  const numbers = lines.splice(0, 2).join('').split(/,| /).filter((nr) => nr);
  let boards = lines.join().split(',,').map((line) => line.split(/,| /)).map((board) => board.filter((nr) => nr).concat(0));
  let foundBoard = false;
  let bingoOrder = 0;
  let lastNumber = -1;
  for (const number of numbers) {
    boards = boards.map((board, i) => {
      if (board[25] === 0) {
        board = board.map((nr) => (nr === number ? 'x' : nr));
        if (bingo(board)) {
          bingoOrder++;
          board[25] = bingoOrder;
        }
        if (bingoOrder === boards.length) foundBoard = board;
      }
      return board;
    });
    if (foundBoard) {
      lastNumber = number;
      break;
    }
  }
  return (lastNumber * foundBoard.slice(0, foundBoard.length - 1).filter((cell) => cell !== 'x').reduce((prev, cell) => prev + +cell, 0));
};

console.log(process.env.part === 'part1' ? getPart1() : getPart2());