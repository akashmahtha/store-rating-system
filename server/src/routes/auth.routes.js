import express from "express";
import {
    register,
    login,
    changePassword,
} from "../controllers/auth.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/change-password", authenticateUser, changePassword);

export default router;