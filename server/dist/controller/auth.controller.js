"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallbackController = void 0;
const auth_service_1 = require("../service/auth.service");
const googleCallbackController = (req, res) => {
    const user = req.user;
    const token = (0, auth_service_1.handleGoogleLogin)(user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};
exports.googleCallbackController = googleCallbackController;
