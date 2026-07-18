

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

// =======================================
// Register User
// =======================================
export const registerUser = async (userData) => {
    // Validate Request
    const validationError = validateRegister(userData);

    if (validationError) {
        throw new Error(validationError);
    }

    // Check Existing Email
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists.");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Save User
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

// =======================================
// Login User
// =======================================
export const loginUser = async ({ email, password }) => {
    // Validate Request
    const validationError = validateLogin({ email, password });

    if (validationError) {
        throw new Error(validationError);
    }

    // Find User
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Compare Password
    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }

    // Generate JWT
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

// =======================================
// Change Password
// =======================================
export const changeUserPassword = async (
    userId,
    oldPassword,
    newPassword
) => {
    // Validate Request
    const validationError = validateChangePassword({
        oldPassword,
        newPassword,
    });

    if (validationError) {
        throw new Error(validationError);
    }

    // Find User by ID
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    // Verify Old Password
    const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Old password is incorrect.");
    }

    // Prevent Same Password
    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error(
            "New password cannot be the same as the old password."
        );
    }

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update Password
    await updatePassword(user.id, hashedPassword);

    return {
        success: true,
        message: "Password updated successfully.",
    };
};