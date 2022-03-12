import ProductService from '../services/product';
import {IQueryProduct, IProductBase, IProductDB} from "../schemas/product";
import {EntityExistingError} from "../utils/errors";
import BaseUseCase from "./base";
class CreateProductInteractor<T, R extends IProductBase, Q extends IQueryProduct> extends BaseUseCase {
    constructor(private productService: ProductService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        const newProduct: R = this.context;
        const query: IQueryProduct = {
            name: newProduct.name
        }
        const existingProduct = await this.productService.get(<Q>query);
        if(existingProduct){
            throw new EntityExistingError("Product already exists");
        }
        const newProductDB = await this.productService.create(newProduct);
        if(newProductDB){
            this.data = newProductDB;
        }
        else{
            throw new Error("Error creating product");
        }
    }
}
class UpdateProductInteractor<T, R extends IProductBase, Q extends IQueryProduct> extends BaseUseCase {
    constructor(private productService: ProductService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        const {updateProduct, targetProduct}= this.context;
        
        const existingProduct = await this.productService.get(<Q>targetProduct);
        if(!existingProduct){
            throw new EntityExistingError("Product not found");
        }
        const updateProductDB = await this.productService.update(<Q>targetProduct, updateProduct);
        if(updateProductDB){
            this.data = updateProductDB;
        }
        else{
            throw new Error("Error updating product");
        }
    }
}

class GetAllProductInteractor<T, R extends IProductBase, Q extends IQueryProduct> extends BaseUseCase {
    constructor(private productService: ProductService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        
        const productsDB: T[] = await this.productService.getAll();
        if(productsDB){
            this.data = productsDB;
        }
        else{
            throw new Error("Error getting products");
        }
    }
}

class GetProductInteractor<T, R extends IProductBase, Q extends IQueryProduct> extends BaseUseCase {
    constructor(private productService: ProductService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        const query: IQueryProduct = this.context;
        const productDB: T | null = await this.productService.get(<Q>query);
        if(productDB){
            this.data = productDB;
        }
        else{
            throw new Error("Error getting product");
        }
    }
}

class DeleteProductInteractor<T, R extends IProductBase, Q extends IQueryProduct> extends BaseUseCase {
    constructor(private productService: ProductService<T, R, Q>) {super();}

    async execute(): Promise<void> {
        const query: IQueryProduct = this.context;
        const productDB: T | null = await this.productService.delete(<Q>query);
        if(productDB){
            this.data = productDB;
        }
        else{
            throw new Error("Error deleting product");
        }
    }
}


export {
    CreateProductInteractor,
    UpdateProductInteractor,
    GetAllProductInteractor,
    GetProductInteractor,
    DeleteProductInteractor
}