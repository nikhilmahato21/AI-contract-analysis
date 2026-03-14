"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectContractType = exports.extractTextFromPDF = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const pdfjs_dist_1 = require("pdfjs-dist");
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
const AI_MODEL = "gemini-1.5-flash";
const extractTextFromPDF = async (fileKey) => {
    try {
        const fileData = await redis_1.default.get(fileKey);
        if (!fileData) {
            throw new Error("File not found");
        }
        let fileBuffer;
        if (Buffer.isBuffer(fileData)) {
            fileBuffer = new Uint8Array(fileData);
        }
        else if (typeof fileData === "object" && fileData !== null) {
            // check if the the object has the expected structure
            const bufferData = fileData;
            if (bufferData.type === "Buffer" && Array.isArray(bufferData.data)) {
                fileBuffer = new Uint8Array(bufferData.data);
            }
            else {
                throw new Error("Invalid file data");
            }
        }
        else {
            throw new Error("Invalid file data");
        }
        const pdf = await (0, pdfjs_dist_1.getDocument)({ data: fileBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
        }
        return text;
    }
    catch (error) {
        console.log(error);
        throw new Error(`Failed to extract text from PDF. Error: ${JSON.stringify(error)}`);
    }
};
exports.extractTextFromPDF = extractTextFromPDF;
const detectContractType = async (contractText) => {
    const prompt = `
    Analyze the following contract text and determine the type of contract it is.
    Provide only the contract type as a single string (e.g., "Employment", "Non-Disclosure Agreement", "Sales", "Lease", etc.).
    Do not include any additional explanation or text.

    Contract text:
    ${contractText.substring(0, 2000)}
  `;
    const { text } = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
    });
    return text?.trim() ?? "";
};
exports.detectContractType = detectContractType;
