
import pool from "../config/db.js";

export const getStoreByOwner = async (ownerId) => {
  const query = `
    SELECT *
    FROM stores
    WHERE owner_id = ?
  `;

  const [rows] = await pool.execute(query, [ownerId]);

  return rows[0];
};

export const getAverageRating = async (storeId) => {
  const query = `
    SELECT
      ROUND(AVG(rating), 2) AS averageRating
    FROM ratings
    WHERE store_id = ?
  `;

  const [rows] = await pool.execute(query, [storeId]);

  return rows[0];
};

export const getRatingsByStore = async (storeId) => {
  const query = `
    SELECT
      u.id,
      u.name,
      u.email,
      r.rating
    FROM ratings r
    JOIN users u
      ON r.user_id = u.id
    WHERE r.store_id = ?
    ORDER BY r.created_at DESC
  `;

  const [rows] = await pool.execute(query, [storeId]);

  return rows;
};