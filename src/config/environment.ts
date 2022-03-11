// import dotenv from "dotenv";
const dotenv = require("dotenv");

const environment = process.env.NODE_ENV;

// config environment
try {
  dotenv.config();
  // if (environment === "development") {
  //   dotenv.config({ path: ".env.dev" });
  // } else if (environment === "production") {
  //   dotenv.config({ path: ".env.prod" });
  // } else {
  //   dotenv.config();
  // }
} catch (error: any) {
  console.log("Dotenv config error: ", error);
}
