"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../utils/prisma");
const router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    session: false,
}), auth_controller_1.googleCallbackController);
router.get("/current-user", auth_1.authenticate, async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                displayName: true,
                email: true,
                profilePicture: true,
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({
        message: "Logged out successfully",
    });
});
exports.default = router;
