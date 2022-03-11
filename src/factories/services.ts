import UserService from "../services/user";
import UserRepository from "../database/mongodb/repositories/user";

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

export {
    UserServiceFactory
}