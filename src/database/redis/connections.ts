import { createClient } from 'redis';
const redisClient = createClient({ legacyMode: true });

redisClient.on('connect', () => {
    console.log('Redis connected');
});
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

export default redisClient;