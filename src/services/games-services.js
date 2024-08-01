import { createGameRep, getGameByNameRep, getGamesRep } from "../repositories/games-repository.js";

export async function postGamesService({ name, image, stockTotal, pricePerDay }) {
    
    const gameExistent = await getGameByNameRep(name);
    if (gameExistent.rowCount) throw {
        type: 'conflict',
        message: 'this game already exists'
    }
    
    await createGameRep(name, image, stockTotal, pricePerDay);
}

export async function getGamesService() {
    const games = await getGamesRep();
    return games;
}