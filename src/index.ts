import express, { NextFunction, Request, Response } from "express";

import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { StatusCodes } from "http-status-codes";

import upload from "@/config/multer";
import { BASE_URL, API_URLS } from "@/utils/constants";

import { ResBody } from "@/types";

dotenv.config();
const dev_mode = process.env.NODE_ENV === "development";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

const corsOptions: CorsOptions = {};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(dev_mode ? "dev" : "combined"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res: Response<ResBody>) => {
    res.json({
        success: true,
        message: "Server is working",
    });
});

app.use(
    `${BASE_URL}/${API_URLS.UPLOAD}`,
    upload.single("file"),
    (req: Request, res: Response<ResBody>) => {
        console.log(req.file);

        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "File not found",
            });
            return;
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
        });
    },
);

app.use(API_URLS.NOT_FOUND, (_req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Url not found",
    });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server is running on port ${PORT}`);
});
