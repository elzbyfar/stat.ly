const calculateOperatingLoad = require('./calculateOperatingLoad');
const getPsum = require('./getPsum');

function getStateMarkers(records) {
  const operatingLoad = calculateOperatingLoad(records);
  let max = 0;
  for (const record of records) {
    max = Math.max(max, getPsum(record))
  }
  return {
    unloaded: 0,
    idle: 0.1,
    loaded: 0.2 * operatingLoad,
    operatingLoad,
    max
  }
}

module.exports = getStateMarkers;