const fs = require('node:fs');
const path = require('node:path');

//const pathStyle = path.resolve(__dirname, 'project-dist');
//const pathStylesFolder = path.resolve(__dirname, 'styles');

//create folder project-dis

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
copyDir();
createProjectFolder();
