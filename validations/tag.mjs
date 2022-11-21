import Joi from "joi";

export const tagValidator = (data) => {
    const rule = Joi.object({
        title: Joi.string().min(6).max(100).required(),
        describe: Joi.string(),
        image: Joi.string(),
        parent_id: Joi.number(),
    });

    return rule.validate(data);
};
