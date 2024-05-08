const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'images/services/bathroom/07052024');

// Чтение содержимого папки
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(file => {
    if (file.includes('hollywood-fl')) {
      const newFileName = file.replace('hollywood-fl', 'memphis-tn');
      const oldFilePath = path.join(directoryPath, file);
      const newFilePath = path.join(directoryPath, newFileName);

      // Переименование файла
      fs.rename(oldFilePath, newFilePath, err => {
        if (err) {
          console.log('Error renaming file:', err);
        } else {
          console.log(`Renamed ${file} to ${newFileName}`);
        }
      });
    }
  });
});