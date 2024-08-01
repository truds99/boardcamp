import httpStatus from "http-status";
import { postRentalService, getRentalsService, endRentalService, deleteRentalService } from "../services/rentals-services.js";

export async function postRental(req, res) {
    try {
        await postRentalService(req.body);
        res.sendStatus(httpStatus.CREATED);

    } catch (e) {
        if (e.type === 'not_found') return res.status(httpStatus.NOT_FOUND).send(e.message);
        if (e.type === 'unprocessable_entity') return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
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
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function endRental(req, res) {
    const id = Number(req.params.id);
    try {
        await endRentalService(id);
        res.sendStatus(httpStatus.OK);
     } catch (e) {
        if (e.type === 'not_found') return res.status(httpStatus.NOT_FOUND).send(e.message);
        if (e.type === 'unprocessable_entity') return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message);
        if (e.type === 'bad_request') return res.status(httpStatus.BAD_REQUEST).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
     }
}

export async function deleteRental(req, res) {
    const id = Number(req.params.id);
    
     try {
        await deleteRentalService(id);
        res.sendStatus(httpStatus.OK);
     } catch (e) {
        if (e.type === 'not_found') return res.status(httpStatus.NOT_FOUND).send(e.message);
        if (e.type === 'bad_request') return res.status(httpStatus.BAD_REQUEST).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
     }
}

