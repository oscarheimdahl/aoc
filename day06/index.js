const getInput = (filename = 'input.txt') =>
  require('fs')
    .readFileSync(filename)
    .toString()
    .trim()
    .split('\n')
    .map((x) => x);

class LanternFish {
  daysTilReproduction;
  children;
  constructor(daysTilReproduction) {
    this.daysTilReproduction = daysTilReproduction;
    this.children = [];
  }
  age() {
    this.children.forEach((fish) => fish.age());
    this.daysTilReproduction--;
    if (this.daysTilReproduction < 0) {
      this.daysTilReproduction = 6;
      this.children.push(new LanternFish(8));
    }
  }

  count() {
    let sum = 0;
    this.children.forEach((child) => (sum += child.count()));
    return 1 + sum;
  }
}

class SmartLanternFish {
  daysTilReproduction;
  children;
  birthdays;

  constructor(daysTilReproduction) {}

  age() {}

  count() {}
}

const getPart1 = () => {
  const fishes = getInput()[0]
    .split(',')
    .map((age) => new LanternFish(+age));
  for (let i = 0; i < 256; i++) {
    fishes.forEach((fish) => fish.age());
  }
  const sum = fishes.reduce((sum, fish) => sum + fish.count(), 0);
  return sum;
};

const getPart2 = () => {};

console.log(process.env.part === 'part1' ? getPart1() : getPart2());
