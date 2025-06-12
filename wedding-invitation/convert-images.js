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
        // 이미지 메타데이터 가져오기
        const metadata = await sharp(inputFile).metadata();
        const { width, height, size } = metadata;
        
        let sharpInstance = sharp(inputFile).rotate(); // Auto-rotate based on EXIF orientation
        
        // 큰 이미지는 리사이징 (너비 1200px 이상인 경우)
        const maxWidth = 1200;
        const maxHeight = 800;
        
        if (width > maxWidth || height > maxHeight) {
          sharpInstance = sharpInstance.resize({
            width: maxWidth,
            height: maxHeight,
            fit: 'inside', // 비율 유지하면서 크기 조정
            withoutEnlargement: true // 작은 이미지는 확대하지 않음
          });
                     console.log(`📏 Resizing ${file}: ${width}x${height} -> max ${maxWidth}x${maxHeight}`);
        }
        
        // 파일 크기에 따른 품질 조정
        let quality = 80; // 기본 품질을 85에서 80으로 낮춤
        
        if (size > 5 * 1024 * 1024) { // 5MB 이상
          quality = 70;
        } else if (size > 2 * 1024 * 1024) { // 2MB 이상
          quality = 75;
        }
        
        // Convert to WebP with optimized settings for smaller file size
        await sharpInstance
          .webp({ 
            quality: quality, // 동적 품질 설정
            effort: 6,        // 최대 압축 노력 (0-6, 높을수록 파일 크기 작음)
            nearLossless: false, // 손실 압축 사용
            smartSubsample: true, // 스마트 서브샘플링 활성화
            reductionEffort: 6   // 색상 팔레트 최적화
          })
          .toFile(outputFile);
        
        // 변환 후 파일 크기 확인
        const outputSize = fs.statSync(outputFile).size;
        const compressionRatio = ((size - outputSize) / size * 100).toFixed(1);
        
        console.log(`✓ Converted ${file} in ${dirName} folder (${(size/1024/1024).toFixed(1)}MB -> ${(outputSize/1024/1024).toFixed(1)}MB, ${compressionRatio}% reduction)`);
        
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