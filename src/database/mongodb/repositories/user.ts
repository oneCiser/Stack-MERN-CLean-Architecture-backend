import { ICRUD } from "../../../domain/repositories/ICRUD";
import {IUserDB, IQueryUser} from "../../../schemas/user";
import {User} from "../model"




class UserRepository implements ICRUD<IUserDB, IUserDB, IQueryUser> {
    

    async get(entity: IQueryUser): Promise<IUserDB | null> {
        return User.findOne({...entity});
    }

    async getAll(): Promise<IUserDB[]> {
        return User.find({});
    }

    async create(entity: IUserDB): Promise<IUserDB | null> {
        return new User({...entity}).save();
    }

    async update(query: IQueryUser, entity: IUserDB): Promise<IUserDB | null> {
        
        return User.findOneAndUpdate(query, entity, {new: true});
    }

    async delete(query: IQueryUser): Promise<IUserDB | null> {
        return User.findOneAndDelete(query);
    }

}

export default UserRepository;