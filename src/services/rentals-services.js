import dayjs from "dayjs";
import db from "../config/database.js";
import { getGameByIdRep } from "../repositories/games-repository.js";
import { getCustomerByIdRep } from "../repositories/customers-repository.js";
import { deleteRentalRep, getOpenedRentalsRep, getRentalByIdRep, getRentalsRep, insertRentalRep, updateRentalRep } from "../repositories/rentals-repository.js";

export async function postRentalService({ customerId, gameId, daysRented }) {
    const rentDate = dayjs().format('YYYY-MM-DD');
    const returnDate = null, delayFee = null;
     
        const game = await getGameByIdRep(gameId) 
        if (!game.rows.length) return null;

        const customer = await getCustomerByIdRep(customerId)
        if (!customer.rows.length) return null;

        const pricePerDay = game.rows[0].pricePerDay;
        const originalPrice = pricePerDay * daysRented;
        const stock = game.rows[0].stockTotal;

        let openedRentals = await getOpenedRentalsRep(gameId);
        if (openedRentals.rowCount >= stock) return null;

        await insertRentalRep(
            customerId, 
            gameId, 
            daysRented, 
            rentDate, 
            originalPrice, 
            returnDate, 
            delayFee
        );

        return true;
}

export async function getRentalsService() {
    const rentals = await getRentalsRep();
    return rentals.rows;
}

export async function endRentalService(id){
    if(isNaN(id) || id % 1 !== 0 || id <= 0) return null;

    let rental = await getRentalByIdRep(id);
    if(!rental.rows.length) return null;

    rental = rental.rows[0];
    if(rental.returnDate) return null;
    
    const returnDate =  dayjs().format('YYYY-MM-DD');
    const scheduledDate = dayjs(rental.rentDate).add(rental.daysRented, 'day');
    const diffDays = dayjs(returnDate).diff(scheduledDate, 'day');
    let delayFee = null;
    if (diffDays > 0) delayFee = diffDays * rental.originalPrice;

    await updateRentalRep(returnDate, delayFee, id);

    return true;

}

export async function deleteRentalService(id) {
    if(isNaN(id) || id % 1 !== 0 || id <= 0) return null;

    const rental = await getRentalByIdRep(id);
    if(!rental.rows.length) return null;
    if(!rental.rows[0].returnDate) return null;

    await deleteRentalRep(id);

    return true;
}