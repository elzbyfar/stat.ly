const express = require('express');
const cors = require('cors');
const createDBInstance = require('./database');
const { DateTime } = require('luxon');
const {
  getMachineStates,
  queryBuilder,
  invalidKeys,
} = require('./utils');

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const startServer = async () => {
  try {
    const db = await createDBInstance();

    app.get('/api/machine-states', async (req, res) => {
      try {
        const { date } = req.query;
        const selectedDate = DateTime.fromISO(date);
        const prevDay = selectedDate.minus({ days: 1 }).toISODate();
        const nextDay = selectedDate.plus({ days: 1 }).toISODate();

        const query = queryBuilder(prevDay, nextDay);
        const collection = db.collection('pump-data');
        const records = await collection.find(query).toArray();

        res.json({
          success: true,
          data: getMachineStates(records, date, prevDay),
        });
      } catch (error) {
        console.error('Failed to query data', error);
        res
          .status(500)
          .json({ success: false, message: 'Failed to query data' });
      }
    });

    app.get('/api/readings', async (req, res) => {
      try {
        const { date, keys } = req.query;
        if (keys === undefined) {
          res.status(400).json({
            success: false,
            message: 'keys is a required query param.',
          });
          return;
        }

        const categories = keys.split(',');

        if (invalidKeys(categories)) {
          res.status(400).json({
            success: false,
            message: 'One ore more keys provided were invalid.',
          });
          return;
        }

        const nextDay = DateTime.fromISO(date).plus({ days: 1 }).toISODate();

        const query = queryBuilder(date, nextDay);
        const collection = db.collection('pump-data');
        const records = await collection.find(query).toArray();

        const timestampsByCategory = records
          .sort((a, b) => (a.fromts < b.fromts ? -1 : 1))
          .map((record) => {
            const response = { ts: record.fromts };

            categories.forEach((category) => {
              response[category] = record.metrics[category]?.avgvalue;
            });

            return response;
          });

        res.json({
          success: true,
          data: { timestampsByCategory },
        });
      } catch (error) {
        console.error('Failed to query data', error);
        res
          .status(500)
          .json({ success: false, message: 'Failed to query data' });
      }
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

startServer();
