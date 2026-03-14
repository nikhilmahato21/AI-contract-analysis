"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAndConfirmContractType = void 0;
const multer_1 = __importDefault(require("multer"));
const ai_service_1 = require("../service/ai.service");
const redis_1 = __importDefault(require("../config/redis"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(null, false);
            cb(new Error("Only PDF files are allowed"));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("contract");
const detectAndConfirmContractType = async (req, res) => {
    const user = req.user;
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        const fileKey = `file:${user?.id}:${Date.now()}`;
        await redis_1.default.set(fileKey, req.file.buffer);
        await redis_1.default.expire(fileKey, 3600); // 1 hour
        const pdfText = await (0, ai_service_1.extractTextFromPDF)(fileKey);
        const detectedType = await (0, ai_service_1.detectContractType)(pdfText);
        await redis_1.default.del(fileKey);
        res.json({ detectedType });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to detect contract type" });
    }
};
exports.detectAndConfirmContractType = detectAndConfirmContractType;
