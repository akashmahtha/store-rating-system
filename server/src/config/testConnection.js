import pool from "./db.js";

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL Connected Successfully");

        connection.release();
    } catch (error) {
        console.error("Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default testConnection;