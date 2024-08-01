import db from "../config/database.js";
import httpStatus from "http-status";
import { postGamesService } from "../services/games-services.js";

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
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games.rows).status(httpStatus.OK);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}