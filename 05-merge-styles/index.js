const fs = require('node:fs');
const path = require('node:path');

const pathStylesBundle = path.resolve(__dirname, 'project-dist', 'bundle.css');
const pathStylesFolder = path.resolve(__dirname, 'styles');

fs.readdir(pathStylesFolder, { withFileTypes: true }, (err, files) => {
  let streamWrite = '';
  let streamRead = '';
  if (err) {
    console.log('Error!' + err);
  } else {
    files.forEach((file) => {
      let filePath = path.resolve(pathStylesFolder, file.name);
      let fileExtname = path.extname(filePath);
      if (fileExtname === '.css') {
        streamRead = fs.createReadStream(filePath, 'utf-8');
        streamWrite = fs.createWriteStream(pathStylesBundle, 'utf-8');

        streamRead.on('data', function (data) {
          streamWrite.write(data);
        });
      }
    });
  }
});
