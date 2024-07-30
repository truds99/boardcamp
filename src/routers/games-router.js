import { Router } from "express";
import { postGames, getGames } from "../controllers/games-controller.js";
import { gameSchema } from "../schemas/game-schema.js";
import validateSchema from '../middlewares/schemas-middleware.js'

export const gamesRouter = Router();

gamesRouter.post('/games', validateSchema(gameSchema), postGames);
gamesRouter.get('/games', getGames);