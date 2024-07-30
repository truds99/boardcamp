import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/database.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));
