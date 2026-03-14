import multer from "multer";

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
