import mongoose from'mongoose';

main()
.then(() => console.log("Mongodb connection successfull"))
.catch(err => console.log("Mongodb connection error: " , err));

async function main() {
  const MONGODB_URI: string | undefined = process.env.MONGODB_URI
  if (MONGODB_URI)  mongoose.connect(MONGODB_URI);
  else throw new Error("MONGODB_URI is undefined")
}