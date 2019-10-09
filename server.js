const express = require('express');
const app = express();

const redisClient = require('./redis-client');

app.get('/store/:key', async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  // setAsync updates the current key as well as setting a new set
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send('Success');
});

app.get('/:key', async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

app.get('/remove/:key', async (req, res) => {
  const { key } = req.params;
  redisClient.deleteAsync(key);
  return res.send('Success');
});

app.get('/', (req, res) => {
  return res.send('Hello world');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});