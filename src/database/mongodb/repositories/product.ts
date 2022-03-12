import { ICRUD } from "../../../domain/repositories/ICRUD";
import {IProductDB, IQueryProduct} from "../../../schemas/product";
import {Product} from "../model"

class ProductRepository implements ICRUD<IProductDB, IProductDB, IQueryProduct> {
        
        
        async get(entity: IQueryProduct): Promise<IProductDB | null> {
            return Product.findOne({...entity});
        }
    
        async getAll(): Promise<IProductDB[]> {
            return Product.find({});
        }
    
        async create(entity: IProductDB): Promise<IProductDB | null> {
            return new Product({...entity}).save();
        }
    
        async update(query: IQueryProduct, entity: IProductDB): Promise<IProductDB | null> {
            
            return Product.findOneAndUpdate(query, entity, {new: true});
        }
    
        async delete(query: IQueryProduct): Promise<IProductDB | null> {
            return Product.findOneAndDelete(query);
        }
    
}

export default ProductRepository