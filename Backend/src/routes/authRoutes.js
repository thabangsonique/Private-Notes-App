import { Router } from "express";
import { LogOut, signIn, signUp } from "../controller/authController.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/logout", LogOut);

export default router;
