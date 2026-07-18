export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log("Allowed Roles :", roles);
        console.log("Current User :", req.user);

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied.",
            });
        }

        next();
    };
};