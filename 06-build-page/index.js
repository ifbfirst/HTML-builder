const fs = require('node:fs');
const path = require('node:path');

//create folder project-dist

function createProjectFolder() {
  const pathProjectFolder = path.join(__dirname, 'project-dist');

  fs.mkdir(pathProjectFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

// copy folder assets

function copyDir() {
  const assetsSourceDirectoryPath = path.join(__dirname, 'assets');
  const assestsDestSubDirectory = path.join(
    __dirname,
    'project-dist',
    'assets',
  );

  fs.readdir(
    assetsSourceDirectoryPath,
    { withFileTypes: true },
    (err, assetsSourceSubDirectories) => {
      if (err) {
        console.log('Error!' + err);
      } else {
        //for each sourceSubdir create destSubdir
        assetsSourceSubDirectories.forEach((assestsSourceSubDirectory) => {
          const assestsSourceSubDirectoryPath = path.join(
            assetsSourceDirectoryPath,
            assestsSourceSubDirectory.name,
          );
          const assestsDestSubDirectoryPath = path.join(
            assestsDestSubDirectory,
            assestsSourceSubDirectory.name,
          );

          fs.mkdir(assestsDestSubDirectoryPath, { recursive: true }, (err) => {
            if (err) throw err;

            fs.readdir(
              assestsDestSubDirectoryPath,
              { withFileTypes: true },
              (err, files) => {
                if (err) {
                  console.log('Error!' + err);
                } else {
                  files.forEach((file) => {
                    let filePath = path.resolve(pathFolderCopy, file.name);
                    fs.unlink(filePath, () => {});
                  });
                }
              },
            );

            fs.readdir(
              assestsSourceSubDirectoryPath,
              { withFileTypes: true },
              (err, files) => {
                if (err) {
                  console.log('Error!' + err);
                } else {
                  files.forEach((file) => {
                    let filePath = path.join(
                      assestsSourceSubDirectoryPath,
                      file.name,
                    );

                    let fileCopyPath = path.join(
                      assestsDestSubDirectoryPath,
                      file.name,
                    );

                    fs.copyFile(filePath, fileCopyPath, () => {});
                  });
                }
              },
            );
          });
        });
      }
    },
  );
}

//create style.css

function addStyle() {
  const pathStylesDest = path.resolve(__dirname, 'project-dist', 'style.css');
  const pathStylesSource = path.resolve(__dirname, 'styles');

  fs.readdir(pathStylesSource, { withFileTypes: true }, (err, files) => {
    let streamWrite = '';
    let streamRead = '';
    if (err) {
      console.log('Error!' + err);
    } else {
      files.forEach((file) => {
        let filePath = path.resolve(pathStylesSource, file.name);
        let fileExtname = path.extname(filePath);
        if (fileExtname === '.css') {
          streamRead = fs.createReadStream(filePath, 'utf-8');
          streamWrite = fs.createWriteStream(pathStylesDest, 'utf-8');

          streamRead.on('data', function (data) {
            streamWrite.write(data);
          });
        }
      });
    }
  });
}

// add index.html

function addIndex() {
  const pathIndexDest = path.resolve(__dirname, 'project-dist', 'index.html');
  const pathComponentsSource = path.resolve(__dirname, 'components');
  const pathTemplatesSource = path.resolve(__dirname, 'template.html');
  let streamReadTemplate = '';
  let streamReadComp = '';
  streamReadTemplate = fs.createReadStream(pathTemplatesSource, 'utf-8');

  streamReadTemplate.on('data', function (data) {
    fs.readdir(pathComponentsSource, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log('Error!' + err);
      } else {
        files.forEach((file) => {
          let fileName = file.name;
          let filePath = path.resolve(pathComponentsSource, file.name);
          let fileExtname = path.extname(filePath);
          if (fileExtname === '.html') {
            streamReadComp = fs.createReadStream(filePath, 'utf-8');

            streamReadComp.on('data', function (component) {
              data = data.replaceAll(
                `{{${fileName.slice(0, fileName.length - 5)}}}`,
                component,
              );
              fs.writeFile(pathIndexDest, data, 'utf8', (err) => {
                if (err) throw err;
              });
            });
          }
        });
      }
    });
  });
}

createProjectFolder();
copyDir();
addStyle();
addIndex();
