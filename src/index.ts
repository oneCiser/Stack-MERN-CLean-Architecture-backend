import "./config/environment";
import "./database/mongodb/connection";
import app from "./api";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT);
}
export default app;
