const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const port = process.env.PORT || 4000;
const app = express();
const redis_port = 6379;
const redis_host = 'redis';
const redisClient = redis.createClient({
  url: `redis://${redis_host}:${redis_port}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis...'));
redisClient.connect();
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI).then(() => console.log('connect to db...')).catch((err) => console.log('failed to connect to db: ',err));

app.get('/', (req, res) => {
	redisClient.set('products', 'products...')
	res.send('<h1>hellow kind man,god saves you,boda</h1>')
});

app.get('/data', async (req, res) => {
        const products = await redisClient.get('products');
        res.send(`<h1>hellow kind man,god saves you,boda</h1> <h2>${products}</h2>`)
});


app.listen(port, () => console.log(`app is up and running on port: ${port}`));
