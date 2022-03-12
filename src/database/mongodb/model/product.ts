import { Schema, model } from 'mongoose';
import { IProductDB } from '../../../schemas/product';


const ProductSchema = new Schema<IProductDB>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, nullable: true, required: false },
  });
  
  export default model<IProductDB>("Product", ProductSchema)