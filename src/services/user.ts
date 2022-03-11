import {ICRUD} from "../domain/repositories/ICRUD";
import bcrypt from "bcrypt";
import {encodeToken} from "../auth/utils";
import {authPayload} from "../schemas/jwt";

export default class UserService<T, R, Q> {
    private repository: ICRUD<T, R, Q>;

    constructor(repository: ICRUD<T, R, Q>) {
        this.repository = repository;
    }

    singUp(user: R): Promise<T | null> {
        return this.repository.create(user);
    }

    async login(username: string): Promise<authPayload> {
        let payload = {
            sub: username
        };
        const SECRET = process.env.JWT_SECRET;
        const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
        if(SECRET){
            const token = encodeToken(payload, SECRET, EXPIRES_IN);
            const response = {
                username: username,
                access_token:"",
                refresh_token:""
            }
            return response;
        }
        else{
            throw new Error("JWT_SECRET not defined");
        }
        
    }

    securePassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    validatePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    getUser(user: Q): Promise<T | null> {
        return this.repository.get(user);
    }
}