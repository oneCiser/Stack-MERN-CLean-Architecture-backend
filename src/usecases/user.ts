import UserService from '../services/user';
import {IQueryUser, IUserBase, IUserDB} from "../schemas/user";
import {EntityExistingError, CredentialsError} from "../utils/errors";
import BaseUseCase from "./base";

class SingUpInteractor<T, R extends IUserBase, Q extends IQueryUser> extends BaseUseCase {
    constructor(private userService: UserService<T, R, Q>) {super();}



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

}
class LogInInteractor<T extends IUserDB, R extends IUserBase, Q extends IQueryUser> extends BaseUseCase{
    constructor(private userService: UserService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        const {username, password} = this.context;
        const query = {
            username
        }
        const existingUser = await this.userService.getUser(<Q>query);
        if(!existingUser){
            throw new CredentialsError("Credentials are not correct");
        }
        const isValidPassword = this.userService.validatePassword(password, (<IUserDB>existingUser).password);
        if(!isValidPassword){
            throw new CredentialsError("Credentials are not correct"); 
        }
        const authPayload = await this.userService.login(username);
        this.data = authPayload;
    }
}
export {
    SingUpInteractor,
    LogInInteractor
}