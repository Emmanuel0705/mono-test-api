import express, { Router } from "express";

import userRoute from "./user.route";
import accountRoute from "./account.route";

const router: Router = express.Router();

router.use("/users", userRoute);
router.use("/accounts", accountRoute);

export default router;
