import httpStatus from "http-status";
import { postGamesService, getGamesService } from "../services/games-services.js";

export async function postGames(req, res) {
    await postGamesService(req.body);
    res.sendStatus(httpStatus.CREATED);
} 

export async function getGames(req, res) { 
    const games = await getGamesService();
    res.send(games).status(httpStatus.OK);
}