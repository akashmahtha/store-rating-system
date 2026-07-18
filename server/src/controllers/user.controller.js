

import {
    viewStores,
    submitRating,
} from "../services/user.service.js";


export const getStores = async (req, res) => {
    try {
        const stores = await viewStores();

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


export const rateStore = async (req, res) => {
    try {
        const { storeId, rating } = req.body;

        const result = await submitRating(
            req.user.id,
            storeId,
            rating
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};