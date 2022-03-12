import { NextFunction, Request, Response } from "express";
import {ProductInteractorFactory} from "../factories/interactors/product"
import {ResponseSchema} from "../schemas/IOHTTP";
import {IProductBase, IProductDB, IQueryProduct, CreateProductValidator, QueryProductValidator} from "../schemas/product";
import {HttpError, EntityExistingError} from "../utils/errors";
import AbstractInteractor from "../usecases/base";
import {createFileUrl} from "../utils"

export default class ProductController{

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {

            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('getall', 'mongodb');
            productInteractor.setContext({});
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
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

    static async get(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params["id"];
            const query: IQueryProduct = {
                _id: id
            }
            if(!QueryProductValidator(query)){
                throw new HttpError(400, QueryProductValidator.errors);
            }
            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('get', 'mongodb');
            productInteractor.setContext(query);
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
                );
            }
            else if(error instanceof EntityExistingError){
                next(
                    new HttpError(404 ,error)
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }

    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const product: IProductBase = req.body;
            if(!CreateProductValidator(product)){
                throw new HttpError(400, CreateProductValidator.errors);
            }
            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('create', 'mongodb');
            productInteractor.setContext(product);
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 201;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
                );
            }
            else if(error instanceof EntityExistingError){
                next(
                    new HttpError(409 ,error)
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params["id"];
            const query: IQueryProduct = {
                _id: id
            }
            const product: IProductBase = req.body;
            const context = {
                updateProduct: product,
                targetProduct:query
            };
            if(!CreateProductValidator(product)){
                throw new HttpError(400, CreateProductValidator.errors);
            }
            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('update', 'mongodb');
            productInteractor.setContext(context);
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
                );
            }
            else if(error instanceof EntityExistingError){
                next(
                    new HttpError(404 ,error)
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params["id"];
            const query: IQueryProduct = {
                _id: id
            }
            if(!QueryProductValidator(query)){
                throw new HttpError(400, QueryProductValidator.errors);
            }
            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('delete', 'mongodb');
            productInteractor.setContext(query);
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
                );
            }
            else if(error instanceof EntityExistingError){
                next(
                    new HttpError(404 ,error)
                );
            }
            else{
                next(
                    new HttpError(500,error)
                );
            }
        }
    }

    static async upLoadPhoto(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params["id"];
            const query: IQueryProduct = {
                _id: id
            }
            let body: IQueryProduct = {
                photo: ""
            }
            if(req.file){
                body.photo = createFileUrl(req);
            }
            else {
                throw new HttpError(400, "Requiered Photo");
            }
            if(!QueryProductValidator(query)){
                throw new HttpError(400, QueryProductValidator.errors);
            }
            const context = {
                updateProduct: body,
                targetProduct:query
            };
            const productInteractor:AbstractInteractor = ProductInteractorFactory.get('update', 'mongodb');
            productInteractor.setContext(context);
            await productInteractor.execute();
            const data = productInteractor.getData();
            const statusCode: number = 200;
            const response = new ResponseSchema({
                statusCode: statusCode,
                data:data
            });
            res.status(statusCode).json(response);
        } catch (error) {
            if(error instanceof HttpError){
                next(
                    error
                );
            }
            else if(error instanceof EntityExistingError){
                next(
                    new HttpError(409 ,error)
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
