import httpStatus from "http-status";
import { postRentalService, getRentalsService, endRentalService, deleteRentalService } from "../services/rentals-services.js";

export async function postRental(req, res) {
    await postRentalService(req.body);
    res.sendStatus(httpStatus.CREATED);
}

export async function getRentals(req, res) { 
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
}

export async function endRental(req, res) {
    const id = Number(req.params.id);
    await endRentalService(id);
    res.sendStatus(httpStatus.OK);
}

export async function deleteRental(req, res) {
    const id = Number(req.params.id);
    await deleteRentalService(id);
    res.sendStatus(httpStatus.OK);
}

