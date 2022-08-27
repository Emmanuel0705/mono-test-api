import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
const ValidateRequstParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    

    // (req.query as any).boundaries = boundaries;

    next();
};

export default ValidateRequstParams;
