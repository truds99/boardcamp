import { createGameRep, getGameByNameRep, getGamesRep } from "../repositories/games-repository.js";

export async function postGamesService({ name, image, stockTotal, pricePerDay }) {
    
    const gameExistent = await getGameByNameRep(name);
    if (gameExistent.rowCount) return null;
    
    await createGameRep(name, image, stockTotal, pricePerDay);

    return true;
}

export async function getGamesService() {
    const games = await getGamesRep();
    return games;
}