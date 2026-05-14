-- AntiGravity Database Schema
-- Run this in Neon SQL Editor before deployment

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups during login
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
