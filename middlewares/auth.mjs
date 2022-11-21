import jwt from "jsonwebtoken";
import { Users } from "../models/index.mjs";
import { responseFailure } from "../classes/response.mjs";
import logger from "../logs/winston.mjs";

export async function requireLogin(req, res, next) {
    const accessToken = req.header("x-access-token");
    try {
        if (accessToken) {
            const token = jwt.verify(accessToken, process.env.TOKEN_SECRET);
            const user = await Users.findOne({
                where: {
                    id: token.id,
                    token: accessToken,
                },
            });

            if (!user) {
                throw new Error("x-access-token is incorrect!");
            }
            req.permissions = user.permissions;
            return next();
        }
        throw new Error("x-access-token is required!");
    } catch (error) {
        logger.error(error);
        res.send(responseFailure("", { errors: error.message }));
    }
}

export function roles(roles) {
    return function (req, res, next) {
        if (!roles.includes(req.permissions)) {
            const error = "Permission not allowed!";
            logger.error(error);
            return res.send(responseFailure("", { errors: error }));
        }
        return next();
    };
}
