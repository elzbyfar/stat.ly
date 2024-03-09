require('dotenv');
const getPsum = require('./getPsum');
const LOAD_THRESHOLD = process.env.OPERATING_LOAD_THRESHOLD || 10;

function getTopReadings(data) {
  // Sort by psum and return top 10
  const sorted = data.sort((a, b) => (getPsum(a) > getPsum(b) ? -1 : 1));
  return sorted.slice(0, LOAD_THRESHOLD);
}

function calculateOperatingLoad(data) {
  // Gets the average of the top 10 Psum_avg values
  const topReadings = getTopReadings(data);
  const pSumTotal = topReadings.reduce((sum, row) => sum + getPsum(row), 0);

  return pSumTotal / LOAD_THRESHOLD;
}

module.exports = calculateOperatingLoad;