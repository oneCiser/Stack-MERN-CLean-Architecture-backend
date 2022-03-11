import cors from "cors";
import morgan from "morgan";
import express, { Application, Router} from "express";
import session from "express-session";
import redisStore from "../database/redis"
import passport from "passport";
import { v4 as uuidv4 } from 'uuid';
import jwtStrategy from "../auth/strategy/jwtStrategy";
import APIV1 from "./v1";
import { errorHandler } from "../middlewares";


class Server{
    private app: Application;
    constructor(){
        this.app = express();
        this.loadCors();
        this.loadJson();
        this.loadMorgan();
        this.loadAuth();
        this.loadRoutes();
        this.loadErrorHandler();
    }
    private loadRoutes(): void{
        const routes: Router = Router();
        routes.use("/v1", APIV1);
        this.app.use("/api", routes);
    }
    private loadCors(): void{
        this.app.use(cors());
    }
    private loadJson(): void{
        this.app.use(express.json());
    }
    private loadMorgan(): void{
        if(process.env.NODE_ENV === "development"){
            this.app.use(morgan("dev"));
        }
    }
    private loadAuth(): void{
        const middlewareSession = session({
            genid: (req) => {
                return uuidv4()
              },
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: false,
            store: redisStore,
            name: "sessionstorage"
        });
        this.app.use(middlewareSession);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use(jwtStrategy);
    }

    private loadErrorHandler(): void{
        this.app.use(errorHandler);
    }
    public listen(port: number = 4000): void{
        this.app.listen(port, () => {
            console.log(`Restful API listening at port: ${port}`);
        });
    }
}

export default new Server();