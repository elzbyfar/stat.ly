function invalidKeys(keys) {
  const validKeys = new Set([
    'F',
    'I1',
    'I2',
    'I3',
    'P1',
    'P2',
    'P3',
    'S1',
    'S2',
    'S3',
    'PF1',
    'PF2',
    'PF3',
    'Iavg',
    'Psum',
    'Ssum',
    'Vll1',
    'Vll2',
    'Vll3',
    'Vln1',
    'Vln2',
    'Vln3',
    'engy',
    'PFavg',
    'Vllavg',
    'Vlnavg',
    'apparentEngy',
  ]);
  
  for (const key of keys) {
    if (!validKeys.has(key)) return true;
  }
  return false;
}

module.exports = invalidKeys;
