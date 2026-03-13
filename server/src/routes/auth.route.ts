import express from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt";
import { googleCallbackController } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
   googleCallbackController
);

router.get("/current-user", authenticate, (req, res) => {
  res.json({
    user: req.user,
  });
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

export default router;