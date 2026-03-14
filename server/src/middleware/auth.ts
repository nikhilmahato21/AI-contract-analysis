import jwt from "jsonwebtoken";

import { AuthRequest, AuthenticatedUser } from "../types/express";

export const authenticate = (req: AuthRequest, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
