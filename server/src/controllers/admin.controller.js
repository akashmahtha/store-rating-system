

import {
    dashboard,
    addUser,
    getAllUsers,
    getUserDetails,
    addStore,
    getAllStores,
    searchAllUsers,
    searchAllStores,
} from "../services/admin.service.js";


export const getDashboard = async (req, res) => {
    try {
        const data = await dashboard();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const createUser = async (req, res) => {
    try {
        const result = await addUser(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const fetchUsers = async (req, res) => {
    try {
        const {
            sortBy = "name",
            order = "ASC",
        } = req.query;

        const users = await getAllUsers(sortBy, order);

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const fetchUserById = async (req, res) => {
    try {
        const user = await getUserDetails(req.params.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


export const createStore = async (req, res) => {
    try {
        const result = await addStore(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const fetchStores = async (req, res) => {
    try {
        const {
            sortBy = "name",
            order = "ASC",
        } = req.query;

        const stores = await getAllStores(sortBy, order);

        return res.status(200).json({
            success: true,
            data: stores,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const searchUser = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const result = await searchAllUsers(search);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const searchStore = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const result = await searchAllStores(search);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};