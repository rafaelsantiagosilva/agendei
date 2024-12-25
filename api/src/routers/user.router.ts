import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

const router = Router();

router.post("/register", UserController.create);
router.post("/login", UserController.login);

export { router as userRouter };