import IPersistence from "./persistence";

interface IUserBase {
    username: string;
    password: string;
}
interface IQueryUser extends IPersistence {
    username?: string;
    password?: string;
}
interface IUserDB extends IUserBase, IPersistence { }

export {
    IUserBase,
    IUserDB,
    IQueryUser
}
