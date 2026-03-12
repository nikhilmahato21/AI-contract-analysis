import { Request, Response } from "express";
import { handleGoogleLogin } from "../service/auth.service";


export const googleCallbackController = (req: Request, res: Response) => {
  const user = req.user;

  const token = handleGoogleLogin(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};