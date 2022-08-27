import express, { Router } from "express";

import AcountController from "../controllers/account.controller";
import catchAsync from "../../utils/catchAsync";
import Protect from "../../middlewares/auth";

const router: Router = express.Router();

const controller = new AcountController();

router.post("/link", Protect, catchAsync(controller.linkAccount));
router.post("/unlink", Protect, catchAsync(controller.unLinkAccount));
router.get("/", Protect, catchAsync(controller.getAccounts));
router.get(
    "/:id/transactions",
    Protect,
    catchAsync(controller.getTransactions)
);

export default router;
