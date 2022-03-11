import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

export default RedisStore;