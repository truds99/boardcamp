import httpStatus from "http-status";

export default function errorHandler(e, req, res, next) {
    if (e.type === 'conflict') return res.status(httpStatus.CONFLICT).send(e.message);
    if (e.type === 'not_found') return res.status(httpStatus.NOT_FOUND).send(e.message);
    if (e.type === 'unprocessable_entity') return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message);
    if (e.type === 'bad_request') return res.status(httpStatus.BAD_REQUEST).send(e.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
}