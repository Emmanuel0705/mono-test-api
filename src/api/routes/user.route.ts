import express, { Router } from "express";

import UserController from "../controllers/user.controller";
import catchAsync from "../../utils/catchAsync";
import ValidateRequstParams from "../../middlewares/requestValidator";

import { hashPassword } from "../../middlewares/user";
import Protect from "../../middlewares/auth";

const router: Router = express.Router();

const controller = new UserController();

router.post(
    "/sign-up",
    catchAsync(hashPassword),
    catchAsync(controller.signUp)
);
router.post("/sign-in", catchAsync(controller.signIn));
router.delete("/", Protect, catchAsync(controller.deleteUser));

export default router;
