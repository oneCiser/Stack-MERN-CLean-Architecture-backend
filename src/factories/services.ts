import UserService from "../services/user";
import ProductService from "../services/product";
import UserRepository from "../database/mongodb/repositories/user";
import ProductRepository from "../database/mongodb/repositories/product";

class UserServiceFactory {
    static get(typeService: string): any {
        switch (typeService) {
            case "mongodb":
                return new UserService(new UserRepository());
            default:
                throw new Error("Type service not found");
        }
    }
}

class ProductServiceFactory {
    static get(typeService: string): any {
        switch (typeService) {
            case "mongodb":
                return new ProductService(new ProductRepository());
            default:
                throw new Error("Type service not found");
        }
    }
}

export {
    UserServiceFactory,
    ProductServiceFactory
}