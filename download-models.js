import fs from 'fs';
import path from 'path';

const modelBaseURL = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model/';
const targetDir = path.resolve('public', 'models');

const files = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model.bin',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model.bin',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model.bin'
];

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Starting model downloads from github...');

async function downloadFile(url, dest) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

(async () => {
  for (const file of files) {
    console.log(`Downloading ${file}...`);
    try {
      await downloadFile(`${modelBaseURL}${file}`, path.join(targetDir, file));
      console.log(`Successfully downloaded ${file}`);
    } catch (e) {
      console.error(`Error downloading ${file}:`, e.message);
    }
  }
  console.log('All models downloaded!');
})();
