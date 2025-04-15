import fs from "fs";
import path from "path";
import multer from "multer";
import { randomBytes } from "crypto";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        if (!fs.existsSync(path.resolve(__dirname, "../uploads"))) {
            fs.mkdirSync(path.resolve(__dirname, "../uploads"), {
                recursive: true,
            });
        }

        cb(null, path.resolve(__dirname, "../uploads"));
    },
    filename: (_req, file, cb) => {
        const suffix = randomBytes(8).toString("hex"); //* size -> 16 bytes = 32 hex chars
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${suffix}${ext}`;

        cb(null, filename);
    },
});

// const fileFilter = () => {}     // TODO: implement file filter

const upload = multer({
    storage,
    // fileFilter,
});

export default upload;
