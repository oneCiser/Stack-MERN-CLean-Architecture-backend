import { Schema, model } from 'mongoose';
import { IUserDB } from '../../../schemas/user';

const UserSchema = new Schema<IUserDB>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IUserDB>("User", UserSchema)