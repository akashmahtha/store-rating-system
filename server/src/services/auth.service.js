

import bcrypt from "bcrypt";

import {
    createUser,
    findUserByEmail,
    findUserById,
    updatePassword,
} from "../models/user.model.js";

import {
    validateRegister,
    validateLogin,
    validateChangePassword,
} from "../validations/auth.validation.js";

import { generateToken } from "../utils/jwt.js";


export const registerUser = async (userData) => {
    // Validate Request
    const validationError = validateRegister(userData);

    if (validationError) {
        throw new Error(validationError);
    }


    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists.");
    }


    const hashedPassword = await bcrypt.hash(userData.password, 10);


    await createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        address: userData.address,
        role: "USER",
    });

    return {
        success: true,
        message: "User registered successfully.",
    };
};


export const loginUser = async ({ email, password }) => {

    const validationError = validateLogin({ email, password });

    if (validationError) {
        throw new Error(validationError);
    }


    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }


    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }


    const token = generateToken(user);

    return {
        success: true,
        message: "Login successful.",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
        },
    };
};


export const changeUserPassword = async (
    userId,
    oldPassword,
    newPassword
) => {

    const validationError = validateChangePassword({
        oldPassword,
        newPassword,
    });

    if (validationError) {
        throw new Error(validationError);
    }


    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }


    const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Old password is incorrect.");
    }


    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error(
            "New password cannot be the same as the old password."
        );
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);


    await updatePassword(user.id, hashedPassword);

    return {
        success: true,
        message: "Password updated successfully.",
    };
};