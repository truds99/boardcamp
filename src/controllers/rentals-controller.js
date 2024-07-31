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

export async function endRental(req, res) {
    const id = Number(req.params.id);
    if(isNaN(id) || id % 1 !== 0 || id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);
    
     try {
        let rental = await db.query(`
            SELECT * FROM rentals
            WHERE id = $1;
        `, [id])
        if(!rental.rows.length) return res.sendStatus(httpStatus.NOT_FOUND);

        rental = rental.rows[0];
       if(rental.returnDate) return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
        
        const returnDate =  dayjs().format('YYYY-MM-DD');
        const scheduledDate = dayjs(rental.rentDate).add(rental.daysRented, 'day');
        const diffDays = dayjs(returnDate).diff(scheduledDate, 'day');
        let delayFee = null;

        if (diffDays > 0) delayFee = diffDays * rental.originalPrice;
    
        await db.query(`
            UPDATE rentals
            SET "returnDate" = $1, "delayFee" = $2
            WHERE id = $3;
        `, [returnDate, delayFee, id]);

        res.sendStatus(httpStatus.OK);
     } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
     }
}

export async function deleteRental(req, res) {
    const id = Number(req.params.id);
    if(isNaN(id) || id % 1 !== 0 || id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);
    
     try {
        let rental = await db.query(`
            SELECT * FROM rentals
            WHERE id = $1;
        `, [id])
        if(!rental.rows.length) return res.sendStatus(httpStatus.NOT_FOUND);
        if(!rental.rows[0].returnDate) return res.sendStatus(httpStatus.BAD_REQUEST);

        await db.query(`
            DELETE FROM rentals
            WHERE id = $1;
        `, [id]);

        res.sendStatus(httpStatus.OK);
     } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
     }
}

