

import pool from "../config/db.js";


export const createUser = async ({
    name,
    email,
    password,
    address,
    role = "USER",
}) => {
    const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES (?, ?, ?, ?, ?)
  `;

    const [result] = await pool.execute(query, [
        name,
        email,
        password,
        address,
        role,
    ]);

    return result;
};


export const findUserByEmail = async (email) => {
    const query = `
    SELECT * FROM users
    WHERE email = ?
  `;

    const [rows] = await pool.execute(query, [email]);

    return rows[0];
};


export const findUserById = async (id) => {
    const query = `
    SELECT id, name, email, address, role
    FROM users
    WHERE id = ?
  `;

    const [rows] = await pool.execute(query, [id]);

    return rows[0];
};


export const updatePassword = async (id, password) => {
    const query = `
    UPDATE users
    SET password = ?
    WHERE id = ?
  `;

    const [result] = await pool.execute(query, [password, id]);

    return result;
};


export const getAllUsers = async () => {
    const query = `
    SELECT id, name, email, address, role
    FROM users
    ORDER BY created_at DESC
  `;

    const [rows] = await pool.execute(query);

    return rows;
};



export const getAllStores = async () => {
    const query = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      ROUND(AVG(r.rating),2) AS averageRating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.name
  `;

    const [rows] = await pool.execute(query);

    return rows;
};



export const getStoreById = async (storeId) => {
    const [rows] = await pool.execute(
        "SELECT * FROM stores WHERE id = ?",
        [storeId]
    );

    return rows[0];
};



export const getUserRating = async (userId, storeId) => {
    const [rows] = await pool.execute(
        "SELECT * FROM ratings WHERE user_id=? AND store_id=?",
        [userId, storeId]
    );

    return rows[0];
};



export const addRating = async (userId, storeId, rating) => {
    const [result] = await pool.execute(
        "INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?)",
        [userId, storeId, rating]
    );

    return result;
};



export const updateRating = async (userId, storeId, rating) => {
    const [result] = await pool.execute(
        "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?",
        [rating, userId, storeId]
    );

    return result;
};