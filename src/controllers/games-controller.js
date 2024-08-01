import httpStatus from "http-status";
import { postGamesService, getGamesService } from "../services/games-services.js";

export async function postGames(req, res) {
    try {
        await postGamesService(req.body);
        res.sendStatus(httpStatus.CREATED);
    } catch (e) {
        if (e.type === 'conflict') return res.status(httpStatus.CONFLICT).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
} 

export async function getGames(req, res) {
    try {    
        const games = await getGamesService();
        res.send(games).status(httpStatus.OK);
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}