import db from "../config/database.js";

export async function postGamesService({ name, image, stockTotal, pricePerDay }) {
    const { rowCount } = await db.query(`
        SELECT * FROM games
        WHERE name = $1;
    `, [name]);
    if (rowCount > 0) return null;
    
    await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);
    `, [name, image, stockTotal, pricePerDay]);

    return true;
}

export async function getGamesService() {
    const games = await db.query(`SELECT * FROM games;`)
    return games.rows;
}