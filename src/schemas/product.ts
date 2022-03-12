import Ajv, {JSONSchemaType} from "ajv"
const ajv: Ajv = new Ajv()
import IPersistence from "./persistence";

interface IProductBase {
    name: string;
    price: number;
    description: string;
    photo?: string;
}

interface IQueryProduct extends IPersistence {
    name?: string;
    price?: number;
    description?: string;
    photo?: string;
}

interface IProductDB extends IProductBase, IPersistence { }


const CreateProductSchema: JSONSchemaType<IProductBase> = {
    type: "object",
    required: ["name", "price", "description"],
    properties: {
        name: {type: "string"},
        price: {type: "number"},
        description: {type: "string"},
        photo: {type: "string", nullable: true}
    },
    additionalProperties: false
}

const CreateProductValidator = ajv.compile(CreateProductSchema);

export {
    IProductBase,
    IProductDB,
    IQueryProduct,
    CreateProductValidator
}

