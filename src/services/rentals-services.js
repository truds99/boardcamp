import dayjs from "dayjs";
import db from "../config/database.js";
import { getGameByIdRep } from "../repositories/games-repository.js";
import { getCustomerByIdRep } from "../repositories/customers-repository.js";
import { deleteRentalRep, getOpenedRentalsRep, getRentalByIdRep, getRentalsRep, insertRentalRep, updateRentalRep } from "../repositories/rentals-repository.js";

export async function postRentalService({ customerId, gameId, daysRented }) {
    const rentDate = dayjs().format('YYYY-MM-DD');
    const returnDate = null, delayFee = null;
     
        const game = await getGameByIdRep(gameId) 
        if (!game.rows.length) throw {
            type: 'not_found',
            message: 'game not found'
        }

        const customer = await getCustomerByIdRep(customerId)
        if (!customer.rows.length) throw {
            type: 'not_found',
            message: 'customer not found'
        }

        const pricePerDay = game.rows[0].pricePerDay;
        const originalPrice = pricePerDay * daysRented;
        const stock = game.rows[0].stockTotal;

        let openedRentals = await getOpenedRentalsRep(gameId);
        if (openedRentals.rowCount >= stock) throw {
            type: 'unprocessable_entity',
            message: 'game not available'
        }

        await insertRentalRep(
            customerId, 
            gameId, 
            daysRented, 
            rentDate, 
            originalPrice, 
            returnDate, 
            delayFee
        );
}

export async function getRentalsService() {
    const rentals = await getRentalsRep();
    return rentals.rows;
}

export async function endRentalService(id){
    if(isNaN(id) || id % 1 !== 0 || id <= 0) throw {
        type: 'bad_request',
        message: 'invalid url'
    }

    let rental = await getRentalByIdRep(id);
    if(!rental.rows.length) throw {
        type: 'not_found',
        message: 'rental not found'
    }

    rental = rental.rows[0];
    if(rental.returnDate) throw {
        type: 'unprocessable_entity',
        message: 'rental already ended'
    }
    
    const returnDate =  dayjs().format('YYYY-MM-DD');
    const scheduledDate = dayjs(rental.rentDate).add(rental.daysRented, 'day');
    const diffDays = dayjs(returnDate).diff(scheduledDate, 'day');
    let delayFee = null;
    if (diffDays > 0) delayFee = diffDays * rental.originalPrice;

    await updateRentalRep(returnDate, delayFee, id);

}

export async function deleteRentalService(id) {
    if(isNaN(id) || id % 1 !== 0 || id <= 0) throw {
        type: 'bad_request',
        message: 'invalid url'
    }

    const rental = await getRentalByIdRep(id);
    if(!rental.rows.length) throw {
        type: 'not_found',
        message: 'rental not found'
    }

    if(!rental.rows[0].returnDate) throw {
        type: 'bad_request',
        message: 'rent still ongoing'
    }
    await deleteRentalRep(id);
}