import httpStatus from "http-status";
import { postRentalService, getRentalsService, endRentalService, deleteRentalService } from "../services/rentals-services.js";

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
        let rentals = await getRentalsService();
        rentals = rentals.map(elm => ({
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
    
     try {
        const result = await deleteRentalService(id);
        if (result) return res.sendStatus(httpStatus.OK);
        res.sendStatus(400);
     } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
     }
}

