import httpStatus from "http-status";

export async function postGames(req, res) {


    try {
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}