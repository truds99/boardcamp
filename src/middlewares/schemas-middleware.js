import httpStatus from "http-status";

export default function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(httpStatus.BAD_REQUEST).send(errors);
        }
        next();
    }
}