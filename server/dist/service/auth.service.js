"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGoogleLogin = void 0;
const jwt_1 = require("../utils/jwt");
const handleGoogleLogin = (user) => {
    const token = (0, jwt_1.generateToken)(user);
    return token;
};
exports.handleGoogleLogin = handleGoogleLogin;
