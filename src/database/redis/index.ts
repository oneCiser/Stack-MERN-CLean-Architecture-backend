import RedisStore from './middleware'
import redisClient from './connections'
const REDIS_HOST: string = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT: number = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
const store = new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    client: redisClient
});

export default store;