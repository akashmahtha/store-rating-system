import { getOwnerDashboard } from "../services/owner.service.js";

export const dashboard = async (req, res) => {
    try {
        const result = await getOwnerDashboard(req.user.id);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};