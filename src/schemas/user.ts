import Ajv, {JSONSchemaType} from "ajv"
const ajv: Ajv = new Ajv()
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

const CreateUserSchema: JSONSchemaType<IUserBase> = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: {type: "string"},
        password: {type: "string"}
    },
    additionalProperties: false
}

const CreateUserValidator = ajv.compile(CreateUserSchema);

export {
    IUserBase,
    IUserDB,
    IQueryUser,
    CreateUserValidator
}
