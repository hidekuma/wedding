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

// Clear output directories before conversion (only if needed)
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

// Only clear directories in production builds or when explicitly requested
const shouldClearDirectories = process.argv.includes('--force') || process.env.NODE_ENV === 'production';

if (shouldClearDirectories) {
  console.log('Clearing output directories...');
  clearDirectory(galleryOutputDir);
  clearDirectory(combinedOutputDir);
}

// Check if file has been modified since last conversion
const isFileModified = (inputFile, outputFile) => {
  if (!fs.existsSync(outputFile)) return true;
  
  const inputStat = fs.statSync(inputFile);
  const outputStat = fs.statSync(outputFile);
  
  return inputStat.mtime > outputStat.mtime;
};

// Process files function with parallel processing and caching
const processFiles = async (inputDir, outputDir, dirName) => {
  if (!fs.existsSync(inputDir)) {
    console.log(`${dirName} directory not found, skipping...`);
    return;
  }

  const files = fs.readdirSync(inputDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });
  
  console.log(`Processing ${files.length} images in ${dirName} folder...`);
  
  // Filter files that need conversion (new or modified)
  const filesToProcess = files.filter(file => {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);
    return isFileModified(inputFile, outputFile);
  });
  
  if (filesToProcess.length === 0) {
    console.log(`All ${dirName} images are up to date, skipping conversion.`);
    return;
  }
  
  console.log(`Converting ${filesToProcess.length} ${dirName} images...`);
  
  // Process files in parallel with limited concurrency
  const concurrencyLimit = 4; // Process 4 images at a time
  const processPromises = [];
  
  for (let i = 0; i < filesToProcess.length; i += concurrencyLimit) {
    const batch = filesToProcess.slice(i, i + concurrencyLimit);
    
    const batchPromises = batch.map(async (file) => {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);

      try {
        // Convert to WebP with optimized settings
        await sharp(inputFile)
          .rotate() // Auto-rotate based on EXIF orientation
          .webp({ 
            quality: 85, // Slightly lower quality for faster processing
            effort: 4    // Faster encoding (0-6, lower = faster)
          })
          .toFile(outputFile);
        
        console.log(`✓ Converted ${file} in ${dirName} folder`);
        
      } catch (err) {
        console.error(`✗ Error processing ${file} in ${dirName}:`, err.message);
      }
    });
    
    // Wait for current batch to complete before starting next batch
    await Promise.all(batchPromises);
  }
};

// Process both directories
const processAllImages = async () => {
  const startTime = Date.now();
  console.log('🚀 Starting image conversion process...');
  
  await processFiles(galleryInputDir, galleryOutputDir, 'gallery');
  await processFiles(combinedInputDir, combinedOutputDir, 'combined');
  
  // Copy loading.gif if it exists
  const loadingGifPath = path.join(combinedInputDir, 'loading.gif');
  const loadingGifDestPath = path.join(combinedOutputDir, 'loading.gif');
  
  if (fs.existsSync(loadingGifPath)) {
    try {
      fs.copyFileSync(loadingGifPath, loadingGifDestPath);
      console.log('📁 Copied loading.gif to combined-webp folder.');
    } catch (err) {
      console.error('Error copying loading.gif:', err.message);
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(`✅ All images processed successfully in ${duration} seconds!`);
};

processAllImages().catch(err => {
  console.error('❌ Error processing images:', err);
}); 