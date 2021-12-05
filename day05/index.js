const getLines = (filename = 'input.txt') =>
  require('fs')
    .readFileSync(filename)
    .toString()
    .trim()
    .split('\n')
    .map((x) => x);

const getPart1 = () => {
  let w = 0;
  let h = 0;
  const lines = getLines()
    .map((line) => {
      const [p1, p2] = line.split(' -> ');
      const [p1x, p1y] = p1.split(',');
      const [p2x, p2y] = p2.split(',');
      if (p1x !== p2x && p1y !== p2y) return;
      w = Math.max(+p1x, +p2x, w);
      h = Math.max(+p1y, +p2y, h);
      return { p1: { x: +p1x, y: +p1y }, p2: { x: +p2x, y: +p2y } };
    })
    .filter((line) => line);

  const map = new Array(w + 1);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(h + 1).fill(0);
  }
  lines.forEach((line) => {
    const minX = Math.min(line.p1.x, line.p2.x);
    const maxX = Math.max(line.p1.x, line.p2.x);
    const minY = Math.min(line.p1.y, line.p2.y);
    const maxY = Math.max(line.p1.y, line.p2.y);
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        map[x][y]++;
      }
    }
  });
  let sum = 0;
  map.forEach((col) => {
    col.forEach((val) => (val > 1 ? sum++ : ''));
  });
  return sum;
};

const getPart2 = () => {
  let w = 0;
  let h = 0;
  const lines = getLines()
    .map((line) => {
      const [p1, p2] = line.split(' -> ');
      const [p1x, p1y] = p1.split(',');
      const [p2x, p2y] = p2.split(',');
      const diagonal = Math.abs(+p1x - +p2x) === Math.abs(+p1y - +p2y);
      if (!diagonal && p1x !== p2x && p1y !== p2y) return;
      w = Math.max(+p1x, +p2x, w);
      h = Math.max(+p1y, +p2y, h);
      return {
        p1: { x: +p1x, y: +p1y },
        p2: { x: +p2x, y: +p2y },
        diagonal,
        leftDiagonal: diagonal && +p1x < +p2x && +p1y > +p2y,
      };
    })
    .filter((line) => line);

  console.log(lines.filter((line) => line.diagonal));

  const map = new Array(w + 1);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(h + 1).fill(0);
  }
  lines.forEach((line) => {
    const minX = Math.min(line.p1.x, line.p2.x);
    const maxX = Math.max(line.p1.x, line.p2.x);
    const minY = Math.min(line.p1.y, line.p2.y);
    const maxY = Math.max(line.p1.y, line.p2.y);
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (!line.diagonal) map[x][y]++;
        else if (!line.leftDiagonal && x - minX === y - minY) {
          map[x][y]++;
        } else if (x - minX === maxY - minY - x - minX) {
          map[x][y]++;
        }
      }
    }
  });
  let sum = 0;
  map.forEach((col) => {
    col.forEach((val) => (val > 1 ? sum++ : ''));
  });
  return sum;
};

console.log(process.env.part === 'part1' ? getPart1() : getPart2());
