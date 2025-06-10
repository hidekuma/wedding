const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src/assets/gallery');
const outputDir = path.join(__dirname, 'src/assets/gallery-webp');
const publicOutputDir = path.join(__dirname, 'public/images/gallery-webp');

// Create output directories if they don't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(publicOutputDir)) {
  fs.mkdirSync(publicOutputDir, { recursive: true });
}

// Clear both output directories before conversion
[outputDir, publicOutputDir].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdir(dir, (err, files) => {
      if (err) return;
      
      for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) console.warn(`Could not delete ${file}:`, err);
        });
      }
    });
  }
});

fs.readdirSync(inputDir).forEach(file => {
  if (file === '.DS_Store') return; // 비이미지 파일 무시
  const inputFile = path.join(inputDir, file);
  const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);
  const publicOutputFile = path.join(publicOutputDir, `${path.parse(file).name}.webp`);

  sharp(inputFile)
    .webp()
    .toFile(outputFile, (err, info) => {
      if (err) {
        console.error(`Error converting ${file}:`, err);
      } else {
        console.log(`Converted ${file} to WebP format.`);
        
        // Copy to public folder
        fs.copyFile(outputFile, publicOutputFile, (copyErr) => {
          if (copyErr) {
            console.error(`Error copying ${file} to public folder:`, copyErr);
          } else {
            console.log(`Copied ${file} to public folder.`);
          }
        });
      }
    });
}); 