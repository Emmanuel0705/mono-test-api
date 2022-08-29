import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserType, User } from "../../models/user.entity";
import AppError from "../../utils/appError";
import { signJwt } from "../../utils";

class UserController {
    public async getUsers(req: Request, res: Response) {
        const user: UserType[] = await User.find();

        res.status(200).json({
            status: "SUCCESS",
            data: {
                user,
            },
        });
    }

    public async signUp(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        let user: any = await User.findOne({ email });
        if (user) throw new AppError("user already exist", 400);

        user = await User.create({
            firstName,
            lastName,
            email,
            password,
        });
        user.password = undefined;

        res.status(200).json({
            status: "SUCCESS",
            data: {
                user,
            },
        });
    }

    public async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        const user: UserType | any = (await User.findOne({ email })) as any;
        if (!user) throw new AppError("Invalid login details", 400);

        const validLogin = await bcrypt.compare(password, user.password);
        if (!validLogin) throw new AppError("Invalid login details", 400);

        const token = signJwt((user as any)._id);

        user.password = undefined;

        res.status(200).json({
            status: "SUCCESS",
            data: {
                token,
                user,
            },
        });
    }

    public async deleteUser(req: Request, res: Response) {
        const userId = (req as any).user._id;
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            status: "SUCCESS",
        });
    }
}

export default UserController;
// code_XlodjoxAMWflTLaJKp9j
