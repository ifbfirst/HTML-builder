const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));

stream.on('data', function (data) {
  console.log(data.toString());
});