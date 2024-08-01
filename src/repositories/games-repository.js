import db from "../config/database.js"

export async function getGameByNameRep(name) {
    const result = await db.query(`
        SELECT * FROM games
        WHERE name = $1;
    `, [name]);

    return result;
}

export async function createGameRep(name, image, stockTotal, pricePerDay) {
    await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);
    `, [name, image, stockTotal, pricePerDay]);
}

export async function getGamesRep() {
    const games = await db.query(`SELECT * FROM games;`);
    return games.rows;
}
 