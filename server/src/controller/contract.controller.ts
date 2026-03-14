import { Response } from "express";
import multer from "multer";
import { detectContractType, extractTextFromPDF } from "../service/ai.service";
import redis from "../config/redis";
import { AuthRequest } from "../types/express";

export interface IUser  {
  googleId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  isPremium: boolean;
}

const upload = multer({ 
    storage: multer.memoryStorage(),
   fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error("Only PDF files are allowed"));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("contract");

export const detectAndConfirmContractType = async (
  req: AuthRequest,
  res: Response
) => {
  const user = req.user ;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const fileKey = `file:${user?.id}:${Date.now()}`;
    await redis.set(fileKey, req.file.buffer);

    await redis.expire(fileKey, 3600); // 1 hour

    const pdfText = await extractTextFromPDF(fileKey);
    const detectedType = await detectContractType(pdfText);

    await redis.del(fileKey);

    res.json({ detectedType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to detect contract type" });
  }
};
