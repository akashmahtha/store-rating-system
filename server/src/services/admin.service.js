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


export const dashboard = async () => {
    return await getDashboardStats();
};


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


export const getAllUsers = async (
    sortBy = "name",
    order = "ASC"
) => {
    return await getUsers(sortBy, order);
};


export const getUserDetails = async (id) => {
    const user = await getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

export const addStore = async (storeData) => {
    await createStore(storeData);

    return {
        success: true,
        message: "Store added successfully.",
    };
};


export const getAllStores = async (
    sortBy = "name",
    order = "ASC"
) => {
    return await getStores(sortBy, order);
};

export const searchAllUsers = async (search) => {
    const users = await searchUsers(search);

    return {
        success: true,
        data: users,
    };
};


export const searchAllStores = async (search) => {
    const stores = await searchStores(search);

    return {
        success: true,
        data: stores,
    };
};