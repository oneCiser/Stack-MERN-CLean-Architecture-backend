import {SingUpInteractor, LogInInteractor} from "../../usecases/user"
import {UserServiceFactory} from "../services"
import {IQueryUser, IUserBase, IUserDB} from "../../schemas/user"

class SingUpInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = UserServiceFactory.get('mongodb');
                return new SingUpInteractor<IUserDB, IUserBase, IQueryUser>(service);
            default:
                throw new Error("Type service not found");
        }
    }
}

class LoginInteractorFactory {
    static get(typeInteractor: string): any {
        switch (typeInteractor) {
            case "mongodb":
                const service = UserServiceFactory.get('mongodb');
                return new LogInInteractor<IUserDB, IUserBase, IQueryUser>(service);
            default:
                throw new Error("Type service not found");
        }
    }
}

class UserInteractorFactory {
    static get(useCases: string, typeInteractor: string): any {
        switch (useCases) {
            case "singup":
                return SingUpInteractorFactory.get(typeInteractor);
            case "login":
                return LoginInteractorFactory.get(typeInteractor);
            default:
                throw new Error("Type use case not found");
        }
    }
}

export {
    UserInteractorFactory
}