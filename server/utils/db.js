import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, '..', 'data');

export function readJSON(filename) {
  const filePath = join(dataDir, filename);
  if (!existsSync(filePath)) return [];
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeJSON(filename, data) {
  const filePath = join(dataDir, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
