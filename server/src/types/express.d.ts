import { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  email?: string;
  displayName?: string;
  profilePicture?: string | null;
  isPremium?: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}
