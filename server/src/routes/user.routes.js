
import express from "express";

import {
    getStores,
    rateStore,
} from "../controllers/user.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


router.use(authenticateUser);


router.get(
    "/stores",
    authorizeRoles("USER", "ADMIN"),
    getStores
);


router.post(
    "/rating",
    authorizeRoles("USER", "ADMIN"),
    rateStore
);

export default router;