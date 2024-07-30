import db from "../config/database.js";
import httpStatus from "http-status";

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}