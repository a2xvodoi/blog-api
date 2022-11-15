import Joi from "joi";

export const tagValidator = (data) => {
    const rule = Joi.object({
        title: Joi.string().min(6).max(50).required(),
        describe: Joi.string().max(100),
        parent_id: Joi.number(),
    });

    return rule.validate(data);
};
