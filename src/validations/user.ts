import Joi from 'joi';

export const getUserSchema = Joi.object({
    id: Joi.string().required()
});

export const addUserSchema = Joi.object({
    name: Joi.string().required(),
    sectors: Joi.array().items(Joi.string()).required(),
    agree_to_terms: Joi.boolean().required()
});

export const updateUserSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    sectors: Joi.array().items(Joi.string()).optional(),
    agree_to_terms: Joi.boolean().optional()
});
