const fs = require('fs');
const path = require('path');

function stripQuotes(value) {
  if (!value) return value;
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function loadEnvFile() {
  const envPath = path.resolve(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) return {};

  const raw = fs.readFileSync(envPath, 'utf8');
  const result = {};

  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const index = trimmed.indexOf('=');
    if (index === -1) return;

    const key = trimmed.slice(0, index).trim();
    const value = stripQuotes(trimmed.slice(index + 1).trim());
    result[key] = value;

    if (!process.env[key]) process.env[key] = value;
  });

  return result;
}

const env = loadEnvFile();

module.exports = {
  port: Number(process.env.PORT || env.PORT || 5000),
  dbConnection: process.env.DB_CONNECTION || process.env.MONGO_URI || env.DB_CONNECTION || env.MONGO_URI || '',
  dbName: process.env.DB_NAME || env.DB_NAME || '',
  jwtSecret: process.env.JWT_SECRET || env.JWT_SECRET || 'RAHASIA_NEGARA',
};
