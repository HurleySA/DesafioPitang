
import Joi from "joi";

const schemaCreate = Joi.object({
    name: Joi.string().min(5).required(),
    born_date: Joi.date().iso().required(),
    vaccination_date: Joi.date().iso().required(),
    vaccinated: Joi.boolean().default(false),
    conclusion: Joi.string().allow(null),
})

const schemaUpdate = Joi.object({
    name: Joi.string().min(5),
    born_date: Joi.date().iso(),
    vaccination_date: Joi.date().iso(),
    vaccinated: Joi.boolean(),
    conclusion: Joi.string().allow(null),
})

export { schemaCreate, schemaUpdate };
