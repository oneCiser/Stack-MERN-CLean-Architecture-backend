import {
    GetAllProductInteractor,
    GetProductInteractor,
    CreateProductInteractor,
    DeleteProductInteractor,
    UpdateProductInteractor
} from "../../usecases/product"
import {ProductServiceFactory} from "../services"
import {IQueryProduct, IProductBase, IProductDB} from "../../schemas/product"

class GetAllProductInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = ProductServiceFactory.get('mongodb');
                return new GetAllProductInteractor<IProductDB, IProductBase, IQueryProduct>(service);
            default:
                throw new Error("Type interactor not found");
        }
    }
}

class GetProductInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = ProductServiceFactory.get('mongodb');
                return new GetProductInteractor<IProductDB, IProductBase, IQueryProduct>(service);
            default:
                throw new Error("Type interactor not found");
        }
    }
}

class CreateProductInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = ProductServiceFactory.get('mongodb');
                return new CreateProductInteractor<IProductDB, IProductBase, IQueryProduct>(service);
            default:
                throw new Error("Type interactor not found");
        }
    }
}

class UpdateProductInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = ProductServiceFactory.get('mongodb');
                return new UpdateProductInteractor<IProductDB, IProductBase, IQueryProduct>(service);
            default:
                throw new Error("Type interactor not found");
        }
    }
}

class DeleteProductInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = ProductServiceFactory.get('mongodb');
                return new DeleteProductInteractor<IProductDB, IProductBase, IQueryProduct>(service);
            default:
                throw new Error("Type interactor not found");
        }
    }
}

class ProductInteractorFactory {
    static get(useCases: string, typeInteractor: string): any {
        switch (useCases) {
            case "get":
                return GetProductInteractorFactory.get(typeInteractor);
            case "getall":
                return GetAllProductInteractorFactory.get(typeInteractor);
            case "create":
                return CreateProductInteractorFactory.get(typeInteractor);
            case "update":
                return UpdateProductInteractorFactory.get(typeInteractor);
            case "delete":
                return DeleteProductInteractorFactory.get(typeInteractor);
            default:
                throw new Error("Type use case not found");
        }
    }
}

export {
    ProductInteractorFactory
}