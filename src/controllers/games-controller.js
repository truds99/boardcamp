import httpStatus from "http-status";
import { postGamesService, getGamesService } from "../services/games-services.js";

export async function postGames(req, res) {
    try {
        const result = await postGamesService(req.body);
        if (result) return res.sendStatus(200);
        res.sendStatus(400);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getGames(req, res) {
    try {    
        const games = await getGamesService();
        if (games) return res.send(games).status(200);
        res.sendStatus(400);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}