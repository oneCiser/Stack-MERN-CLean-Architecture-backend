const redis = require("redis");
const redisClient = redis.createClient({ 
    legacyMode: true,
    url: process.env.REDIS_URL
});

redisClient.on('connect', () => {
    console.log('Redis connected');
});
redisClient.on('error', (err: Error) => {
    console.log('Redis error: ', err);
});

async function connectRedis(){
    await redisClient.connect();
}
connectRedis();

export default redisClient;