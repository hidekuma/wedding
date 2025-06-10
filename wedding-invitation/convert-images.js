const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryInputDir = path.join(__dirname, 'src/assets/gallery');
const galleryOutputDir = path.join(__dirname, 'public/images/gallery-webp');
const combinedInputDir = path.join(__dirname, 'src/assets/combined');
const combinedOutputDir = path.join(__dirname, 'public/images/combined-webp');

// Create output directories if they don't exist
[galleryOutputDir, combinedOutputDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Clear output directories before conversion
const clearDirectory = (dir) => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file !== '.DS_Store' && file !== 'loading.gif') { // loading.gif는 보존
        try {
          fs.unlinkSync(path.join(dir, file));
        } catch (err) {
          console.warn(`Could not delete ${file}:`, err.message);
        }
      }
    });
  }
};

clearDirectory(galleryOutputDir);
clearDirectory(combinedOutputDir);

// Process files function
const processFiles = async (inputDir, outputDir, dirName) => {
  if (!fs.existsSync(inputDir)) {
    console.log(`${dirName} directory not found, skipping...`);
    return;
  }

  const files = fs.readdirSync(inputDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });
  
  for (const file of files) {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);

    try {
      // Convert to WebP with EXIF orientation correction
      await sharp(inputFile)
        .rotate() // Auto-rotate based on EXIF orientation
        .webp()
        .toFile(outputFile);
      
      console.log(`Converted ${file} to WebP format in ${dirName} folder.`);
      
    } catch (err) {
      console.error(`Error processing ${file} in ${dirName}:`, err.message);
    }
  }
};

// Process both directories
const processAllImages = async () => {
  console.log('Starting gallery images conversion...');
  await processFiles(galleryInputDir, galleryOutputDir, 'gallery');
  
  console.log('Starting combined images conversion...');
  await processFiles(combinedInputDir, combinedOutputDir, 'combined');
  
  // Copy loading.gif if it exists
  const loadingGifPath = path.join(combinedInputDir, 'loading.gif');
  const loadingGifDestPath = path.join(combinedOutputDir, 'loading.gif');
  
  if (fs.existsSync(loadingGifPath)) {
    try {
      fs.copyFileSync(loadingGifPath, loadingGifDestPath);
      console.log('Copied loading.gif to combined-webp folder.');
    } catch (err) {
      console.error('Error copying loading.gif:', err.message);
    }
  }
  
  console.log('All images processed successfully!');
};

processAllImages().catch(err => {
  console.error('Error processing images:', err);
}); 