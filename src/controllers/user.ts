import { NextFunction, Request, Response } from "express";
import {UserInteractorFactory} from "../factories/interactors/user"

export default class UserController {

    static async singUp(req: Request, res: Response, next: NextFunction){
        try {
            const userInteractor = UserInteractorFactory.get('singup', 'mongodb');
            userInteractor.setContext(req.body);
            await userInteractor.execute();
            const data = userInteractor.getData();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}