import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import ownerRoutes from "./routes/owner.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Store Rating System API 🚀",
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/user", userRoutes);

app.use("/api/owner", ownerRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("✅ Database Connected Successfully");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(" Database Connection Failed");
        console.log(error.message);
        process.exit(1);
    }
};

startServer();