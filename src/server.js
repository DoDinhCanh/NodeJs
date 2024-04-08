import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connectMongoDB from "./config/dbconfig.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 9000;
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1:27017/db-lab";
connectMongoDB(dbUrl);
// routes(app);
app.use("/", router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
