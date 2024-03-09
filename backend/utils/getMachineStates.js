const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');
const calculateOperatingLoad = require('./calculateOperatingLoad');
const getPsum = require('./getPsum');

function classifyMachineState(pSumAvg, operatingLoad) {
  let machineState = 'On - loaded';

  if (pSumAvg === 0) {
    machineState = 'Off';
  } else if (pSumAvg <= 0.1) {
    machineState = 'On - unloaded';
  } else if (pSumAvg < 0.2 * operatingLoad) {
    machineState = 'On - idle';
  }
  return machineState;
}

function getMachineStates(records, date, prevDay) {
  const prevDayRecords = [];
  const requestedRecords = records
    .filter((record) => {
      const recordDate = DateTime.fromMillis(record.fromts).toISODate();
      if (recordDate === prevDay) {
        prevDayRecords.push(record);
      }
      return recordDate === date;
    })
    .sort((a, b) => (a.fromts < b.fromts ? -1 : 1));

  // Operating load uses the previous day's records
  const operatingLoad = calculateOperatingLoad(prevDayRecords);

  
  // Generates blocks of state based on record's psum in relation to the operating load
  // If no data is available, creates a block of 'Off' state
  const states = [];
  let i = 0;
  let validStart = DateTime.fromISO(date).startOf('day').toMillis();

  while (i < requestedRecords.length) {
    while (validStart < requestedRecords[i].fromts) {
      if (!states.length) {
        states.push({ id: uuidv4(), state: 'Off', start: validStart });
        validStart += 60000;
        continue;
      }
      if (states.at(-1)?.state !== 'Off') {
        const diff = validStart - states.at(-1).start;
        states.at(-1).end = validStart;
        states.at(-1).duration = diff;
        states.push({ id: uuidv4(), state: 'Off', start: validStart });
      }
      validStart += 60000;
    }
    if (!states.length) {
      states.push({
        id: uuidv4(),
        state: classifyMachineState(
          getPsum(requestedRecords[i]),
          operatingLoad
        ),
        start: requestedRecords[i].fromts,
      });
      continue;
    }

    const prevState = states.at(-1)?.state;
    const currState = classifyMachineState(
      getPsum(requestedRecords[i]),
      operatingLoad
    );
    if (prevState !== currState) {
      const diff = requestedRecords[i].fromts - states.at(-1).start;
      states.at(-1).end = requestedRecords[i].fromts;
      states.at(-1).duration = diff;
      states.push({ id: uuidv4(), state: currState, start: requestedRecords[i].fromts });
    }
    validStart += 60000;
    i++;
  }
  if (states.at(-1)?.end === undefined) {
    const diff = validStart - states.at(-1).start;
    states.at(-1).end = validStart;
    states.at(-1).duration = diff;
  }
  return { states, operatingLoad };
}

module.exports = getMachineStates;
