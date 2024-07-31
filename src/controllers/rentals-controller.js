import db from "../config/database.js";
import httpStatus from "http-status";
import dayjs from "dayjs";

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    const returnDate = null, delayFee = null;
    
    try {
        const game = await db.query(`
            SELECT * FROM games
            WHERE id = $1;
        `, [gameId]);
        if (!game.rows.length) return res.sendStatus(httpStatus.NOT_FOUND);

        const customer = await db.query(`
            SELECT * FROM customers
            WHERE id = $1;
        `, [customerId]);
        if (!customer.rows.length) return res.sendStatus(httpStatus.NOT_FOUND);

        const pricePerDay = game.rows[0].pricePerDay;
        const originalPrice = pricePerDay * daysRented;
        const stock = game.rows[0].stockTotal;

        const pastRentals = await db.query(`
            SELECT * FROM rentals
            WHERE "gameId" = $1 
            AND "returnDate" IS NULL;
        `, [gameId]);
        const openRentals = pastRentals.rowCount;
        if (openRentals >= stock) return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);

        await db.query(`
            INSERT INTO rentals
            ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);

        res.sendStatus(httpStatus.CREATED);
        
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getRentals(req, res) {
    try {    
        let rentals = await db.query(`
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
        
        rentals = rentals.rows.map(elm => ({
            id: elm.id,
            customerId: elm.customerId,
            gameId: elm.gameId,
            rentDate: elm.rentDate,
            daysRented: elm.daysRented,
            returnDate: elm.returnDate,
            originalPrice: elm.originalPrice,
            delayFee: elm.delayFee,
            customer: {
                id: elm.customerId,
                name: elm.customerName
            },
            game: {
                id: elm.gameId,
                name: elm.gameName
            }
        }));
        
        res.send(rentals).status(httpStatus.OK);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}


