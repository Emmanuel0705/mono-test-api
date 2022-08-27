import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { UserType, User } from "../models/user.entity";

export default catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        //check if token found
        if (!token) {
            return next(new AppError("no token found", 401));
        }

        //check if token is valid
        const decode: any = await promisify<any, any, any>(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decode.userId);

        //check if user with this token still exist
        if (!currentUser) {
            return next(new AppError("This user is no longer exist", 404));
        }

        (req as any).user = currentUser;
        next();
    }
);
