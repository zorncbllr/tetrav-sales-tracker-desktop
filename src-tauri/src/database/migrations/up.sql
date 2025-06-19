PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    user_id     INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    username    TEXT UNIQUE NOT NULL,
    email       TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fuels (
    fuel_id INTEGER PRIMARY KEY,
    fuel_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS fuel_prices (
    fuel_price_id INTEGER PRIMARY KEY,
    fuel_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (fuel_id) REFERENCES fuels(fuel_id)
);

CREATE TABLE IF NOT EXISTS accounts (
    account_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    account_name   TEXT NOT NULL UNIQUE,
    account_type   TEXT NOT NULL CHECK (account_type IN ('station', 'office', 'individual'))
);

CREATE TABLE IF NOT EXISTS individuals (
    account_id     INTEGER PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stations (
    account_id        INTEGER PRIMARY KEY,
    contact_personnel TEXT NOT NULL,
    branch            TEXT NOT NULL,
    address           TEXT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS offices (
    account_id INTEGER PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
        ON DELETE CASCADE
);
