import db from "../config/database.js";
import httpStatus from "http-status";
import dayjs from "dayjs";
import { postRentalService } from "../services/rentals-services.js";

export async function postRental(req, res) {
    try {
        const result = await postRentalService(req.body);
        if (result) return res.sendStatus(httpStatus.CREATED);
        res.sendStatus(400);
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

