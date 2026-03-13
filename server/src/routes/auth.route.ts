import express, { Response } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt";
import { googleCallbackController } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../types/express";

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

router.get("/current-user", authenticate, async (req: AuthRequest, res:any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        displayName: true,
        email: true,
        profilePicture: true,
      },
    });

    res.json(user);
  } catch (error) {
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

export default router;