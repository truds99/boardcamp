import db from "../config/database.js";

export async function getOpenedRentalsRep(id) {
    const openedRentals = await db.query(`
        SELECT * FROM rentals
        WHERE "gameId" = $1 
        AND "returnDate" IS NULL;
    `, [id]);
    return openedRentals;
}

export async function insertRentalRep(
    customerId, 
    gameId, 
    daysRented, 
    rentDate, 
    originalPrice, 
    returnDate, 
    delayFee
) {
    await db.query(`
        INSERT INTO rentals
        ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);
}

export async function getRentalsRep() {
    const rentals = await db.query(`
        SELECT 
            rentals.id,
            rentals."customerId",
            rentals."gameId",
            rentals."rentDate",
            rentals."daysRented",
            rentals."returnDate",
            rentals."originalPrice",
            rentals."delayFee",
            customers.id AS "customerId",
            customers.name AS "customerName",
            games.id AS "gameId",
            games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
    `, );

    return rentals;
}

export async function getRentalByIdRep(id) {
    const rental = await db.query(`
        SELECT * FROM rentals
        WHERE id = $1;
    `, [id])

    return rental;
}

export async function updateRentalRep(returnDate, delayFee, id) {
    await db.query(`
        UPDATE rentals
        SET "returnDate" = $1, "delayFee" = $2
        WHERE id = $3;
    `, [returnDate, delayFee, id]);
}

export async function deleteRentalRep(id) {
    await db.query(`
        DELETE FROM rentals
        WHERE id = $1;
    `, [id]);
}

