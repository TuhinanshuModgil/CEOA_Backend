import { Router } from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWTToken, logoutUser)
router.route("/user").get(verifyJWTToken, currentUser)
// router.route("/registerAdmin").get(verifyJWTToken, currentUser)


export default router