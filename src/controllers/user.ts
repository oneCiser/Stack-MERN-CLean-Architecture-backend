import { NextFunction, Request, Response } from "express";
import {UserInteractorFactory} from "../factories/interactors/user"
import {ResponseSchema} from "../schemas/IOHTTP";
import {HttpError, EntityExistingError} from "../utils/errors";

export default class UserController {

    static async singUp(req: Request, res: Response, next: NextFunction){
        try {
            const userInteractor = UserInteractorFactory.get('singup', 'mongodb');
            userInteractor.setContext(req.body);
            await userInteractor.execute();
            const data = userInteractor.getData();
            const response = new ResponseSchema({
                statusCode: 200,
                data:{
                    username: data.username,
                }
            });
            res.status(200).json(response);
        } catch (error) {
            if(error instanceof EntityExistingError){
                next(
                    new HttpError(409,error)
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }
}