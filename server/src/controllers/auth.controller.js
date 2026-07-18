

import {
    registerUser,
    loginUser,
    changeUserPassword,
} from "../services/auth.service.js";


export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const result = await changeUserPassword(
            req.user.id,
            oldPassword,
            newPassword
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};