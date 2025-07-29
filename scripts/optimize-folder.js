// scripts/optimize-folder.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images');

const compressImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const isWebImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  if (!isWebImage) return;

  const buffer = fs.readFileSync(filePath);

  // Ресайз и сжатие с более жёсткими параметрами
  const output = ext === '.png'
    ? sharp(buffer)
        .resize({ width: 1200 })
        .png({ quality: 60, compressionLevel: 9 })
    : sharp(buffer)
        .resize({ width: 1200 })
        .webp({ quality: 60 });

  const outPath = filePath.replace(ext, '.webp');
  await output.toFile(outPath);

  if (outPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // удаляем оригинал
  }

  console.log(`✔ Compressed: ${path.basename(filePath)}`);
};

const processDir = async (dirPath) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDir(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
};

processDir(dir).then(() => {
  console.log('\n🎉 Оптимизация завершена!');
});