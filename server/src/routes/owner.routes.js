import express from "express";

import { dashboard } from "../controllers/owner.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.use(authorizeRoles("OWNER"));

router.get("/dashboard", dashboard);

export default router;