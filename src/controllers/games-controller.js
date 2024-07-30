import db from "../config/database.js";
import httpStatus from "http-status";

export async function postGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        const { rowCount } = await db.query(`
            SELECT * FROM games
            WHERE name = $1;
        `, [name]);
        if (rowCount > 0) return res.sendStatus(httpStatus.CONFLICT)
        
        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay])
        res.sendStatus(httpStatus.CREATED);
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