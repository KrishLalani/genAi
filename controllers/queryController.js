// controllers/queryController.js
const { sqliteDB } = require('../config/db');
const { generateToken } = require('../config/jwt');

// Generate JWT token for authentication
const getToken = (req, res) => {
    const token = generateToken({ user: 'admin' });
    res.json({ token });
};

// A more robust translation mechanism for natural language to SQL
const translateToSQL = (query) => {
    if (/sales.*last quarter/i.test(query)) {
        return "SELECT * FROM sales WHERE quarter = (SELECT MAX(quarter) FROM sales);";
    }
    if (/total.*revenue/i.test(query)) {
        return "SELECT SUM(amount) AS total_revenue FROM transactions;";
    }
    if (/top.*customers/i.test(query)) {
        return "SELECT customer_id, COUNT(*) AS orders FROM orders GROUP BY customer_id ORDER BY orders DESC LIMIT 5;";
    }
    throw new Error('Unsupported or ambiguous query. Please refine your query.');
};

// Handle natural language queries and return simulated results
const queryHandler = (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required.' });
        }

        const sql = translateToSQL(query);

        sqliteDB.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Query execution failed.' });
            }
            res.json({ query, sql, results: rows });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Provide a breakdown of the query for better understanding
const explainHandler = (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required.' });
        }

        const sql = translateToSQL(query);

        const explanation = `The query "${query}" is translated to SQL: "${sql}"`;
        res.json({ query, explanation });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Validate whether a query can be processed
const validateHandler = (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required.' });
        }

        translateToSQL(query); // Check if query is translatable
        res.json({ query, status: 'Valid query' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { queryHandler, explainHandler, validateHandler, getToken };
