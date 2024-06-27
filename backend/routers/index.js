import { Router } from "express";
import loginRouter from "./login.js";
import registerRouter from "./register.js";
import refreshTokenRouter from "./refreshToken.js";
import logoutRouter from "./logout.js";

const router = Router();

router.use(loginRouter);
router.use(registerRouter);
router.use(refreshTokenRouter);
router.use(logoutRouter);

export default router;
