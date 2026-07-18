import {
    getStoreByOwner,
    getAverageRating,
    getRatingsByStore,
} from "../models/owner.model.js";

export const getOwnerDashboard = async (ownerId) => {
    const store = await getStoreByOwner(ownerId);

    if (!store) {
        throw new Error("Store not found.");
    }

    const averageRating = await getAverageRating(store.id);
    const ratings = await getRatingsByStore(store.id);

    return {
        store: {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
        },
        averageRating: averageRating.averageRating || 0,
        totalRatings: ratings.length,
        ratings,
    };
};