const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'images');
const outputDir = inputDir; // перезапись в той же папке

const quality = 70;

const processImage = async (file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (metadata.format === 'webp') {
      await image.webp({ quality }).toFile(outputPath);
      console.log(`✔ Optimized: ${file}`);
    } else {
      console.log(`⚠ Skipped (not webp): ${file}`);
    }
  } catch (err) {
    console.error(`❌ Failed: ${file}`, err);
  }
};

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.webp')) {
    processImage(file);
  }
});