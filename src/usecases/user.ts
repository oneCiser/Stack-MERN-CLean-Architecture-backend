import UserService from '../services/user';
import {IQueryUser, IUserBase} from "../schemas/user";
import {EntityExistingError} from "../utils/errors";

class SingUpInteractor<T, R extends IUserBase, Q extends IQueryUser> {
    private context: any;
    private data: any
    constructor(private userService: UserService<T, R, Q>) {}

    setContext(context: any) {
        this.context = context;
    }

    async execute(): Promise<void> {
        const {username, password} = this.context;
        const hashedPassword = this.userService.securePassword(password);
        const query = {
            username
        }
        const existingUser = await this.userService.getUser(<Q>query);

        if(existingUser){
            throw new EntityExistingError("User already exists");
        }
        const userData = {
            username,
            password: hashedPassword
        }
        const newUser = await this.userService.singUp(<R>userData);
        if(newUser){
            this.data = newUser;
        }
    }
    getData(): any {
        return this.data;
    }

}

export {
    SingUpInteractor
}