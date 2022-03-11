import dotenv from "dotenv";

const environment = process.env.NODE_ENV;

// config environment
try {
  if (environment === "development") {
    dotenv.config({ path: ".env.dev" });
  } else if (environment === "production") {
    dotenv.config({ path: ".env.prod" });
  } else {
    dotenv.config();
  }
} catch (error: any) {
  console.log("Dotenv config error: ", error);
}
