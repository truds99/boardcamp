import db from "../config/database.js";
import httpStatus from "http-status";
import dayjs from "dayjs";
import { postRentalService, getRentalsService, endRentalService } from "../services/rentals-services.js";

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
        const rentals = await getRentalsService();
        
        res.send(rentals).status(httpStatus.OK);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function endRental(req, res) {
    const id = Number(req.params.id);
    try {
        const result = await endRentalService(id);
        if (result) return res.sendStatus(httpStatus.OK);
        res.sendStatus(400);
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

