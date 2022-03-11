import { Router, Request, Response, NextFunction } from "express";
import UserController from "../../controllers/user";

const userRouter: Router = Router();

userRouter.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  UserController.singUp(req, res, next)
);




export default userRouter;
