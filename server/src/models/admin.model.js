// models/admin.model.js

import pool from "../config/db.js";

// =======================================
// Dashboard Statistics
// =======================================

export const getDashboardStats = async () => {
  const [[users]] = await pool.execute(
    "SELECT COUNT(*) AS totalUsers FROM users"
  );

  const [[stores]] = await pool.execute(
    "SELECT COUNT(*) AS totalStores FROM stores"
  );

  const [[ratings]] = await pool.execute(
    "SELECT COUNT(*) AS totalRatings FROM ratings"
  );

  return {
    totalUsers: users.totalUsers,
    totalStores: stores.totalStores,
    totalRatings: ratings.totalRatings,
  };
};

// =======================================
// Add User (Admin/User/Owner)
// =======================================

export const createNewUser = async ({
  name,
  email,
  password,
  address,
  role,
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

// =======================================
// Get All Users (Sorting)
// =======================================

export const getUsers = async (
  sortBy = "name",
  order = "ASC"
) => {

  const allowedColumns = [
    "name",
    "email",
    "address",
    "role",
  ];

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "name";
  }

  order = order.toUpperCase() === "DESC"
    ? "DESC"
    : "ASC";

  const query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        ORDER BY ${sortBy} ${order}
    `;

  const [rows] = await pool.query(query);

  return rows;
};

// =======================================
// Get User By ID
// =======================================

export const getUserById = async (id) => {
  const query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        WHERE id = ?
    `;

  const [rows] = await pool.execute(query, [id]);

  return rows[0];
};

// =======================================
// Add Store
// =======================================

export const createStore = async ({
  name,
  email,
  address,
  owner_id,
}) => {
  const query = `
        INSERT INTO stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)
    `;

  const [result] = await pool.execute(query, [
    name,
    email,
    address,
    owner_id,
  ]);

  return result;
};

// =======================================
// Get All Stores (Sorting)
// =======================================

export const getStores = async (
  sortBy = "name",
  order = "ASC"
) => {

  const allowedColumns = [
    "name",
    "email",
    "address",
    "rating",
  ];

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "name";
  }

  order = order.toUpperCase() === "DESC"
    ? "DESC"
    : "ASC";

  const query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            u.name AS ownerName,
            ROUND(AVG(r.rating), 2) AS rating
        FROM stores s
        LEFT JOIN users u
            ON s.owner_id = u.id
        LEFT JOIN ratings r
            ON s.id = r.store_id
        GROUP BY s.id
        ORDER BY ${sortBy} ${order}
    `;

  const [rows] = await pool.query(query);

  return rows;
};

// =======================================
// Search Users
// =======================================

export const searchUsers = async (search = "") => {
  const query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        WHERE
            name LIKE ?
            OR email LIKE ?
            OR address LIKE ?
            OR role LIKE ?
        ORDER BY name ASC
    `;

  const keyword = `%${search}%`;

  const [rows] = await pool.execute(query, [
    keyword,
    keyword,
    keyword,
    keyword,
  ]);

  return rows;
};

// =======================================
// Search Stores
// =======================================

export const searchStores = async (search = "") => {
  const query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            u.name AS ownerName,
            ROUND(AVG(r.rating), 2) AS averageRating
        FROM stores s
        LEFT JOIN users u
            ON s.owner_id = u.id
        LEFT JOIN ratings r
            ON s.id = r.store_id
        WHERE
            s.name LIKE ?
            OR s.email LIKE ?
            OR s.address LIKE ?
            OR u.name LIKE ?
        GROUP BY s.id
        ORDER BY s.name ASC
    `;

  const keyword = `%${search}%`;

  const [rows] = await pool.execute(query, [
    keyword,
    keyword,
    keyword,
    keyword,
  ]);

  return rows;
};