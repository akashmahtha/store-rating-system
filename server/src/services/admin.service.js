import bcrypt from "bcrypt";

import {
    getDashboardStats,
    createNewUser,
    getUsers,
    getUserById,
    createStore,
    getStores,
    searchUsers,
    searchStores,
} from "../models/admin.model.js";

import { findUserByEmail } from "../models/user.model.js";

// =======================================
// Dashboard
// =======================================
export const dashboard = async () => {
    return await getDashboardStats();
};

// =======================================
// Add User
// =======================================
export const addUser = async (userData) => {
    const { name, email, password, address, role } = userData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createNewUser({
        name,
        email,
        password: hashedPassword,
        address,
        role,
    });

    return {
        success: true,
        message: "User created successfully.",
    };
};

// =======================================
// Get All Users (Sorting)
// =======================================
export const getAllUsers = async (
    sortBy = "name",
    order = "ASC"
) => {
    return await getUsers(sortBy, order);
};

// =======================================
// Get User Details
// =======================================
export const getUserDetails = async (id) => {
    const user = await getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

// =======================================
// Add Store
// =======================================
export const addStore = async (storeData) => {
    await createStore(storeData);

    return {
        success: true,
        message: "Store added successfully.",
    };
};

// =======================================
// Get All Stores (Sorting)
// =======================================
export const getAllStores = async (
    sortBy = "name",
    order = "ASC"
) => {
    return await getStores(sortBy, order);
};

// =======================================
// Search Users
// =======================================
export const searchAllUsers = async (search) => {
    const users = await searchUsers(search);

    return {
        success: true,
        data: users,
    };
};

// =======================================
// Search Stores
// =======================================
export const searchAllStores = async (search) => {
    const stores = await searchStores(search);

    return {
        success: true,
        data: stores,
    };
};