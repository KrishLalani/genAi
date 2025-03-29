// config/db.js
const sqlite3 = require('sqlite3');
const { Pool } = require('pg');
require('dotenv').config();

// SQLite (in-memory database for rapid prototyping)
const sqliteDB = new sqlite3.Database(':memory:', (err) => {
    if (err) console.error('SQLite Connection Error:', err);
    else console.log('Connected to SQLite (in-memory)');
});

// Initialize SQLite tables (real-world simulation)
sqliteDB.serialize(() => {
    sqliteDB.run(`CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        region TEXT,
        amount INTEGER,
        quarter TEXT
    )`);
    sqliteDB.run(`INSERT INTO sales (region, amount, quarter) VALUES 
        ('North', 5000, 'Q1'), 
        ('South', 7000, 'Q1'), 
        ('West', 6000, 'Q2'),
        ('East', 8000, 'Q2'),
        ('Central', 4500, 'Q3')`);

    sqliteDB.run(`CREATE TABLE transactions (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        amount INTEGER,
        date TEXT
    )`);
    sqliteDB.run(`INSERT INTO transactions (customer_id, amount, date) VALUES 
        (1, 150, '2024-01-15'),
        (2, 200, '2024-02-20'),
        (1, 300, '2024-03-10'),
        (3, 400, '2024-03-25'),
        (2, 500, '2024-04-05')`);

    sqliteDB.run(`CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        region TEXT
    )`);
    sqliteDB.run(`INSERT INTO customers (name, region) VALUES 
        ('Alice', 'North'),
        ('Bob', 'South'),
        ('Charlie', 'West')`);
});

// // PostgreSQL (for production-like environment)
// const postgresDB = new Pool({
//     connectionString: process.env.POSTGRES_URI,
//     max: 10, // Connection pool size
//     idleTimeoutMillis: 30000, // Time before releasing idle clients
// });

// postgresDB.connect()
//     .then(() => console.log('Connected to PostgreSQL'))
//     .catch((err) => console.error('PostgreSQL Connection Error:', err));

module.exports = { sqliteDB};
