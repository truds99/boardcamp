import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import { gamesRouter } from "./routers/games-router.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(gamesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));
