const fs = require('node:fs');
const path = require('node:path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log('Error!' + err);
  } else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        let filePath = path.resolve(pathFolder, file.name);
        let fileExtname = path.extname(filePath);
        let fileName = path.basename(filePath, fileExtname);

        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            process.stdout.write(
              `${fileName} - ${fileExtname.slice(1)} - ${stats.size} bytes \n`,
            );
          }
        });
      }
    });
  }
});
