require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const URI = process.env.MONGODB_ATLAS_URI;

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function createDBInstance() {
  await client.connect();

  // confirm connection is successful!
  await client.db('admin').command({ ping: 1 });
  console.log('Yes! We have a connection!');

  return client.db();
}

module.exports = createDBInstance;
