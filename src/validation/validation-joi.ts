import express from "express";
import Joi, { ObjectSchema } from "joi";

class validationJoi{
    userSchema = Joi.object({
        name: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
        surname: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
        email: Joi.string().email().required(),
        age: Joi.number().positive().min(18).required(),
    });
}

export default new validationJoi();