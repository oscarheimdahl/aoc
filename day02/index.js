const fs = require('fs');

const lines = (filename = 'input.txt') => fs.readFileSync(filename).toString().trim().split('\n').map((x) => x);

function getPart1() {
  const pos = lines()
    .map((line) => line.split(' '))
    .reduce(
      (prevInput, input) => {
        const change = parseInt(input[1]);
        switch (input[0]) {
          case 'forward':
            return { x: prevInput.x + change, z: prevInput.z };
          case 'down':
            return { x: prevInput.x, z: prevInput.z + change };
          case 'up':
            return { x: prevInput.x, z: prevInput.z - change };
        }
      },
      { x: 0, z: 0 }
    );
  return pos.x * pos.z;
}

function getPart2() {
  const pos = lines()
    .map((line) => line.split(' '))
    .reduce(
      (prevInput, input) => {
        const change = parseInt(input[1]);
        switch (input[0]) {
          case 'forward':
            return { x: prevInput.x + change, z: prevInput.z + prevInput.a * change, a: prevInput.a };
          case 'down':
            return { x: prevInput.x, z: prevInput.z, a: prevInput.a + change };
          case 'up':
            return { x: prevInput.x, z: prevInput.z, a: prevInput.a - change };
        }
      },
      { x: 0, z: 0, a: 0 }
    );
  return pos.x * pos.z;
}

console.log(process.env.part === 'part1' ? getPart1() : getPart2());
