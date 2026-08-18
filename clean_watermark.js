const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');
const totalFrames = 240;

async function processFrames() {
  console.log('Starting watermark cleanup...');
  
  // We'll create a 200x200 #050505 rectangle
  const rectSize = 250;
  const overlayBuffer = await sharp({
    create: {
      width: rectSize,
      height: rectSize,
      channels: 4,
      background: { r: 5, g: 5, b: 5, alpha: 1 } // #050505
    }
  }).webp().toBuffer();

  for (let i = 0; i < totalFrames; i++) {
    const frameName = `frame_${String(i).padStart(3, '0')}.webp`;
    const framePath = path.join(framesDir, frameName);
    
    if (!fs.existsSync(framePath)) {
      console.error(`Frame not found: ${frameName}`);
      continue;
    }

    try {
      const metadata = await sharp(framePath).metadata();
      
      const left = metadata.width - rectSize;
      const top = metadata.height - rectSize;

      const tempPath = framePath + '.tmp';

      await sharp(framePath)
        .composite([
          {
            input: overlayBuffer,
            top: top,
            left: left
          }
        ])
        .webp({ quality: 90 })
        .toFile(tempPath);
        
      fs.renameSync(tempPath, framePath);
      
      if (i % 20 === 0) console.log(`Processed up to frame ${i}`);
    } catch (err) {
      console.error(`Error processing ${frameName}:`, err);
    }
  }
  
  console.log('Finished watermark cleanup.');
}

processFrames();
