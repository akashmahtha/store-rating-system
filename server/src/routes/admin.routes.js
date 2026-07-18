import express from "express";

import {
    getDashboard,
    createUser,
    fetchUsers,
    fetchUserById,
    createStore,
    fetchStores,
    searchUser,
    searchStore,
} from "../controllers/admin.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.use(authorizeRoles("ADMIN"));

router.get("/dashboard", getDashboard);

router.post("/users", createUser);
router.get("/users", fetchUsers);
router.get("/users/search", searchUser);
router.get("/users/:id", fetchUserById);

router.post("/stores", createStore);
router.get("/stores/search", searchStore);
router.get("/stores", fetchStores);

export default router;