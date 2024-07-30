import { Router } from "express";
import { postGames } from "../controllers/games-controller.js";
import { gameSchema } from "../schemas/game-schema.js";
import validateSchema from '../middlewares/schemas-middleware.js'

export const gamesRouter = Router();

gamesRouter.post('/games', validateSchema(gameSchema), postGames);