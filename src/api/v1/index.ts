import UserRouter from "./user.route";
import ProductRouter from "./product.route";
import {Router} from "express";
import passport from 'passport';
const routes: Router = Router();

routes.use("/auth",UserRouter);
routes.use("/product",passport.authenticate("jwt",{failureMessage: true, session: true}),ProductRouter);
export default routes;
