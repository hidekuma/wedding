const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src/assets/gallery');
const outputDir = path.join(__dirname, 'src/assets/gallery-webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Clear the output directory before conversion
fs.readdir(outputDir, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(outputDir, file), err => {
      if (err) throw err;
    });
  }
});

fs.readdirSync(inputDir).forEach(file => {
  if (file === '.DS_Store') return; // 비이미지 파일 무시
  const inputFile = path.join(inputDir, file);
  const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);

  sharp(inputFile)
    .webp()
    .toFile(outputFile, (err, info) => {
      if (err) {
        console.error(`Error converting ${file}:`, err);
      } else {
        console.log(`Converted ${file} to WebP format.`);
      }
    });
}); 