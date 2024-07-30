import joi from "joi";

export const customerSchema = joi.object({
    name: joi.string().required().trim(),
    cpf: joi.string().length(11).pattern(/^\d+$/).required(),
    phone: joi.string().length(10).length(11).pattern(/^\d+$/).required()
})