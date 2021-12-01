const fs = require('fs');

function lines(filename = 'input.txt') {
  return fs
    .readFileSync(filename)
    .toString()
    .trim()
    .split('\n')
    .map((x) => parseInt(x));
}

function getSolutionPart1() {
  let increased = 0;
  let prevNumber = Infinity;
  lines().forEach((number) => {
    if (prevNumber < number) increased++;
    prevNumber = number;
  });
  return increased;
}

function getSolutionPart2() {
  const linesList = lines();
  let increased = 0;
  let prevNumber = Infinity;
  linesList.forEach((number, i) => {
    if (linesList[i + 1] === undefined || linesList[i + 2] === undefined) return;
    threeSum = number + linesList[i + 1] + linesList[i + 2];
    if (threeSum > prevNumber) increased++;
    prevNumber = threeSum;
  });
  return increased;
}

const part = process.env.part || 'part1';

if (part === 'part1') console.log(getSolutionPart1());
else console.log(getSolutionPart2());
