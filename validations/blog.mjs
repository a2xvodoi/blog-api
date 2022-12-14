import Joi from "joi";

const convertStringToArray = (value, helpers) => {
    const arr = value.split(", ");
    if (!arr.every((element) => !isNaN(element))) {
        return helpers.error("any.invalid");
    }
    return arr;
};

export const blogValidator = (data) => {
    const rule = Joi.object({
        title: Joi.string().min(6).max(100).required(),
        summary: Joi.string(),
        content: Joi.string().required(),
        image: Joi.string(),
        published: Joi.boolean(),
        parent_id: Joi.number(),
        tags: Joi.string().custom(convertStringToArray, "convert field"),
    });

    return rule.validate(data);
};
