import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
// console.log("jsij")
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server has started on PORT: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Connection Error !! ", error);
  });
