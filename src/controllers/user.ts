import ValidationError from "ajv/dist/runtime/validation_error";
import { NextFunction, Request, Response } from "express";
import {UserInteractorFactory} from "../factories/interactors/user"
import {ResponseSchema} from "../schemas/IOHTTP";
import {CreateUserValidator, IUserBase} from "../schemas/user";
import {HttpError, EntityExistingError, CredentialsError} from "../utils/errors";
import AbstractInteractor from "../usecases/base";

export default class UserController {

    static async singUp(req: Request, res: Response, next: NextFunction){
        try {
            const newUser: IUserBase = req.body;
            if(!CreateUserValidator(newUser)){
                throw new HttpError(400, CreateUserValidator.errors);
            }
            const userInteractor:AbstractInteractor = UserInteractorFactory.get('singup', 'mongodb');
            userInteractor.setContext(newUser);
            await userInteractor.execute();
            const data = userInteractor.getData();
            const statusCode: number = 201;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:{
                    username: data.username,
                }
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof EntityExistingError){
                next(
                    new HttpError(409,error)
                );
            }
            else if(error instanceof HttpError){
                next(
                    error
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }
    static async logIn(req: Request, res: Response, next: NextFunction){
        try {
            const user: IUserBase = req.body;
            if(!CreateUserValidator(user)){
                throw new HttpError(400, CreateUserValidator.errors);
            }
            const userInteractor:AbstractInteractor = UserInteractorFactory.get('login', 'mongodb');
            userInteractor.setContext(user);
            await userInteractor.execute();
            const data = userInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof EntityExistingError){
                next(
                    new HttpError(409,error)
                );
            }
            else if (error instanceof CredentialsError){
                next(
                    new HttpError(401,error)
                );
            }
            else if(error instanceof HttpError){
                next(
                    error
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }
    static async logOut(req: Request, res: Response, next: NextFunction){
        try {
            req.logout();
            res.status(205).json({});
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
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