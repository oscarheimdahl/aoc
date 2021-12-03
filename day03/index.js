const getLines = (filename = 'input.txt') =>
  require('fs').readFileSync(filename).toString().trim().split('\n').map((x) => x);

const getPart1 = () => {
  const lines = getLines();
  const gamma = lines[0].split('').map((_, i) => lines.slice(1).reduce((sum, line) => +sum + +line[i], 0)).map((bitSum) => (bitSum > lines.length / 2 ? 1 : 0)).join('');
  const epsilon = gamma.split('').map((char) => (+char === 1 ? 0 : 1)).join('');
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const getPart2 = () => {
  let lines = getLines();
  let oneLines = lines;
  let zeroLines = lines;
  let i = 0;
  while (oneLines.length > 1 || zeroLines.length > 1) {
    const one1 = [];
    const one0 = [];
    const zero1 = [];
    const zero0 = [];
    if (oneLines.length > 1) {
      oneLines.forEach((line) => {
        if (line.split('')[i] === '1') one1.push(line);
        else one0.push(line);
      });
      oneLines = one1.length >= one0.length ? one1 : one0;
    }
    if (zeroLines.length > 1) {
      zeroLines.forEach((line) => {
        if (line.split('')[i] === '1') zero1.push(line);
        else zero0.push(line);
      });
      zeroLines = zero0.length <= zero1.length ? zero0 : zero1;
    }
    i++;
  }
  return parseInt(oneLines[0], 2) * parseInt(zeroLines[0], 2);
};

console.log(process.env.part === 'part1' ? getPart1() : getPart2());
