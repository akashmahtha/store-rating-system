

import {
    getAllStores,
    getStoreById,
    getUserRating,
    addRating,
    updateRating,
} from "../models/user.model.js";


export const viewStores = async () => {
    return await getAllStores();
};


export const submitRating = async (userId, storeId, rating) => {
    // Rating Validation
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
    }


    const store = await getStoreById(storeId);

    if (!store) {
        throw new Error("Store not found.");
    }


    const existingRating = await getUserRating(userId, storeId);

    if (existingRating) {
        await updateRating(userId, storeId, rating);

        return {
            success: true,
            message: "Rating updated successfully.",
        };
    }


    await addRating(userId, storeId, rating);

    return {
        success: true,
        message: "Rating submitted successfully.",
    };
};