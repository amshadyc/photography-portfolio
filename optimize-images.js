const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configuration
const QUALITY = 80; // JPEG quality (0-100)
const SIZES = {
  thumbnail: 300, // For mobile
  medium: 600, // For tablets
  large: 900, // For desktop
  original: 1200, // For lightbox
};

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, "optimized");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Generate different sizes for both JPG and WebP
  for (const [sizeName, size] of Object.entries(SIZES)) {
    // JPG version
    await sharp(inputPath)
      .resize(size, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(path.join(outputPath, `${filename}-${sizeName}.jpg`));

    // WebP version
    await sharp(inputPath)
      .resize(size, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(outputPath, `${filename}-${sizeName}.webp`));
  }
}

async function processDirectory(inputDir) {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(inputDir, file);
      console.log(`Processing ${file}...`);
      await optimizeImage(inputPath, inputDir);
    }
  }
}

// Process all image directories
const directories = [
  "images/work",
  "images/worship",
  "images/living",
  "images/featured",
];

async function processAllDirectories() {
  for (const dir of directories) {
    console.log(`\nProcessing directory: ${dir}`);
    await processDirectory(dir);
  }
}

processAllDirectories()
  .then(() => console.log("\nImage optimization complete!"))
  .catch((err) => console.error("Error:", err));
