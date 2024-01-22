const fs = require('node:fs');
const path = require('node:path');
const pathFolder = path.resolve(__dirname, 'files');
const pathFolderCopy = path.resolve(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(pathFolderCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFolderCopy, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Error!' + err);
    } else {
      files.forEach((file) => {
        let filePath = path.resolve(pathFolderCopy, file.name);
        fs.unlink(filePath, () => {});
      });
    }
  });

  fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Error!' + err);
    } else {
      files.forEach((file) => {
        let filePath = path.resolve(pathFolder, file.name);
        let fileCopyPath = path.resolve(pathFolderCopy, file.name);
        fs.copyFile(filePath, fileCopyPath, () => {});
      });
    }
  });
}
copyDir();
