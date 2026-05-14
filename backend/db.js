const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Required for Neon/Render
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
