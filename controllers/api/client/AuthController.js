import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Users } from "../../../models";
import { loginValidator, registerValidator } from "../../../validations/auth";
import {
    responseFailure,
    responseSuccess,
    dataResponse,
} from "../../../classes/response";

const AuthController = {
    async register(req, res) {
        const { error } = registerValidator(req.body);
        if (error)
            return res.send(
                responseFailure("", { errors: error.details[0].message })
            );

        try {
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
                return res.send(
                    responseFailure("", {
                        errors: "Username or email field already exists!",
                    })
                );
            const user = await Users.create(req.body);
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24,
            });
            user.token = token;
            await user.save();
            const response = dataResponse(user, ["user_name", "email", "first_name", "last_name", "token"]);
            res.send(
                responseSuccess("Đăng ký tài khoản thành công!", response)
            );
        } catch (error) {
            res.send(
                responseFailure(
                    "Đăng ký tài khoản thất bại!Đã có lỗi xảy ra!",
                    error
                )
            );
        }
    },

    async login(req, res) {
        const { error } = loginValidator(req.body);

        if (error)
            return res.send(
                responseFailure("", { errors: error.details[0].message })
            );

        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user)
            return res.send(
                responseFailure("", {
                    errors: "Email or Password is not correct",
                })
            );

        const isCorrectPassword = bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isCorrectPassword)
            return res.send(
                responseFailure("", { errors: "Password is not correct" })
            );

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 2,
        });
        user.token = token;
        await user.save();
        const response = dataResponse(user, ["user_name", "email", "first_name", "last_name", "token"]);
        res.send(responseSuccess("Đăng nhập thành công!", response));
    },

    async logout(req, res) {
        const token = req.header("auth-token");

        if (!token)
            return res.send(
                responseFailure("", { errors: "Token is required" })
            );
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
            console.log(error);
            return res.send(
                responseFailure("Đăng xuất thất bại! Đã có lỗi xảy ra!", {
                    errors: error,
                })
            );
        }
    },
};

export default AuthController;
