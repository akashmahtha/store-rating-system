// services/user.service.js

import {
    getAllStores,
    getStoreById,
    getUserRating,
    addRating,
    updateRating,
} from "../models/user.model.js";

// =======================================
// View All Stores
// =======================================
export const viewStores = async () => {
    return await getAllStores();
};

// =======================================
// Submit / Update Rating
// =======================================
export const submitRating = async (userId, storeId, rating) => {
    // Rating Validation
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
    }

    // Check Store Exists
    const store = await getStoreById(storeId);

    if (!store) {
        throw new Error("Store not found.");
    }

    // Check Existing Rating
    const existingRating = await getUserRating(userId, storeId);

    if (existingRating) {
        await updateRating(userId, storeId, rating);

        return {
            success: true,
            message: "Rating updated successfully.",
        };
    }

    // Add Rating
    await addRating(userId, storeId, rating);

    return {
        success: true,
        message: "Rating submitted successfully.",
    };
};