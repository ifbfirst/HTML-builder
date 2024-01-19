const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const stream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

console.log('Hello! Enter some text.');

process.stdin.on('data', function (data) {
  if (data.toString().trim().toLowerCase() === 'exit') {
    console.log('Bye!');
    process.exit();
  } else {
    stream.write(data);
    console.log('Enter some text.');
  }
});
process.on('SIGINT', () => {
  console.log('Bye!');
  process.exit();
});