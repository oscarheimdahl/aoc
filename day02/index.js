const lines = (filename = 'input.txt') => require('fs').readFileSync(filename).toString().trim().split('\n').map((x) => x);
const getPart1 = () => lines().map((line) => line.split(' ')).reduce((prevInput, input) => input[0] === 'forward' ? { x: prevInput.x + parseInt(input[1]), z: prevInput.z } : input[0] === 'down' ? { x: prevInput.x, z: prevInput.z + parseInt(input[1]) } : { x: prevInput.x, z: prevInput.z - parseInt(input[1]) }, { x: 0, z: 0 });
const getPart2 = () => lines().map((line) => line.split(' ')).reduce((prevInput, input) => input[0] === 'forward' ? { x: prevInput.x + parseInt(input[1]), z: prevInput.z + prevInput.a * parseInt(input[1]), a: prevInput.a } : input[0] === 'down' ? { x: prevInput.x, z: prevInput.z, a: prevInput.a + parseInt(input[1]) } : { x: prevInput.x, z: prevInput.z, a: prevInput.a - parseInt(input[1]) }, { x: 0, z: 0, a: 0 });
const multi = ({x, z}) => x * z
console.log(process.env.part === 'part1' ? multi(getPart1()) : multi(getPart2()));
