import express, { Express, Request, NextFunction } from "express";
import { connect } from "mongoose";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";

import ApiRoutes from "./api/routes";
import errorHandler from "./middlewares/errorHandler";
import AppError from "./utils/appError";

config({ path: __dirname + "/.env" });

const app: Express = express();

app.use(cors());

app.use(helmet());

app.set("trust proxy", 1);

app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 50, // allow 5 calls per minute
        message: "Too many requests from this IP. Try again in 1 min.",
    })
);

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api", ApiRoutes);

app.all("*", (req: Request, _, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

const DATABASE_URI = process.env.DATABASE_URI;

console.log(DATABASE_URI);

connect(DATABASE_URI as string, (err) => {
    if (err) {
        console.error("FAILED TO CONNECT TO MONGODB");
        console.error(err);
    } else {
        console.log("CONNECTED TO MONGODB!!");
        app.listen(port, () =>
            console.log(
                `App listening on port ${port} in ${process.env.NODE_ENV} mode.`
            )
        );
    }
});

// oluwatobi_1
