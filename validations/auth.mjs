import Joi from "joi";

const obj = {
    email: Joi.string().trim().min(6).max(225).required().email(),
    password: Joi.string().trim()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
};

export const registerValidator = (data) => {
    const rule = Joi.object({
        ...obj,
        user_name: Joi.string().trim().min(6).max(225).required(),
        email: Joi.string().trim().min(6).max(225).required(),
        first_name: Joi.string().trim().max(225).required(),
        last_name: Joi.string().trim().max(225).required(),
        birthday: Joi.date().allow(null, ""),
        gender: Joi.string().trim().allow(null, ""),
        phone: Joi.string().trim().allow(null, ""),
        job: Joi.string().trim().allow(null, ""),
        describe: Joi.string().trim().allow(null, ""),
        address: Joi.string().trim().allow(null, ""),
    });

    return rule.validate(data);
};

export const loginValidator = (data) => {
    const rule = Joi.object(obj);

    return rule.validate(data);
};
