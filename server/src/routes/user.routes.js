// routes/user.routes.js

import express from "express";

import {
    getStores,
    rateStore,
} from "../controllers/user.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// All routes require login
router.use(authenticateUser);

// User and Admin can view stores
router.get(
    "/stores",
    authorizeRoles("USER", "ADMIN"),
    getStores
);

// User and Admin can submit/update rating
router.post(
    "/rating",
    authorizeRoles("USER", "ADMIN"),
    rateStore
);

export default router;