import UserRouter from "./user.route";
import {Router} from "express";
import passport from 'passport';
const routes: Router = Router();

routes.use("/auth",UserRouter)
export default routes;
