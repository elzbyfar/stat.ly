const { DateTime } = require('luxon');

function getTimestamp(iso) {
  const dt = DateTime.fromISO(iso);
  return dt.toMillis();
}

function updateObj(obj, key, value) {
  obj[key] = value;
  return obj;
}

function queryBuilder(gte, lte) {
  let fromts = {};

  if (gte) {
    fromts = updateObj(fromts, '$gte', getTimestamp(gte));
  }
  if (lte) {
    fromts = updateObj(fromts, '$lte', getTimestamp(lte));
  }

  if (!Object.keys(fromts).length) return {};

  return { fromts };
}

module.exports = queryBuilder;
