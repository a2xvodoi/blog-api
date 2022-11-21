import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Users } from "../../../models/index.mjs";
import logger from "../../../logs/winston.mjs";
import { loginValidator, registerValidator } from "../../../validations/auth.mjs";
import {
    responseFailure,
    responseSuccess,
    dataResponse,
} from "../../../classes/response";
import { objectClean } from "../../../classes/helpers";

const AuthController = {
    check(req, res) {
        res.send(responseSuccess());
    },
    async register(req, res) {
        try {
            const { error } = registerValidator(req.body);
            if (error) throw new Error(error.details[0].message);

            const existUser = await Users.findOne({
                where: {
                    [Op.or]: [
                        {
                            user_name: req.body.user_name,
                        },
                        {
                            email: req.body.email,
                        },
                    ],
                },
            });
            if (existUser)
                throw new Error("Username or email field already exists!");
            const user = await Users.create(objectClean(req.body));
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24,
            });
            user.token = token;
            await user.save();
            const response = dataResponse(user, [
                "user_name",
                "email",
                "first_name",
                "last_name",
                "token",
                "permissions",
            ]);
            res.send(
                responseSuccess("Đăng ký tài khoản thành công!", response)
            );
        } catch (err) {
            logger.error(err);
            res.send(
                responseFailure(
                    "Đăng ký tài khoản thất bại!Đã có lỗi xảy ra!",
                    { errors: err.message }
                )
            );
        }
    },

    async login(req, res) {
        try {
            const { error } = loginValidator(req.body);

            if (error) throw new Error(error.details[0].message);
            const user = await Users.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) throw new Error("Email or Password is not correct!");

            const isCorrectPassword = bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!isCorrectPassword) throw new Error("Password is not correct!");

            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 2,
            });
            user.token = token;
            await user.save();
            const response = dataResponse(user, [
                "user_name",
                "email",
                "first_name",
                "last_name",
                "token",
                "permissions",
            ]);
            res.send(responseSuccess("Đăng nhập thành công!", response));
        } catch (err) {
            logger.error(err);
            return res.send(responseFailure("", { errors: err.message }));
        }
    },

    async logout(req, res) {
        const token = req.header("auth-token");

        if (!token) throw new Error("Token is required!");
        try {
            const user = await Users.findOne({
                where: {
                    token: token,
                },
            });
            if (user) {
                user.token = null;
                await user.save();
            }
            return res.send(responseSuccess("Đăng xuất thành công!"));
        } catch (error) {
            logger.error(error);
            return res.send(
                responseFailure("Đăng xuất thất bại! Đã có lỗi xảy ra!", {
                    errors: error,
                })
            );
        }
    },
};

export default AuthController;
