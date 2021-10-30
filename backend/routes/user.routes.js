const express = require('express');
const router = express.Router();

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'dbadmin',
    password: 'dbadmin',
    database: 'psicoweb',
    port: '5432'
});

router.get('/', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.status(200).json(users.rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(user.rows);
});

router.post('/create', async (req, res) => {
    const { email, password, name, lastname } = req.body;
    const timestamp = new Date();

    await pool.query('INSERT INTO users (email, password, name, lastname, created, updated) VALUES ($1, $2, $3, $4, $5, $6)', [email, password, name, lastname, timestamp, timestamp]);

    res.status(200).send('USER CREATED');
});

router.put('/update/:id', async (req, res) => {
    const { email, password, name, lastname } = req.body;
    const id = req.params.id;
    const timestamp = new Date();

    const response = await pool.query('UPDATE users SET email = $2, password = $3, name = $4, lastname = $5, updated = $6 WHERE id = $1', [id, email, password, name, lastname, timestamp]);

    res.status(200).json(response);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE users SET deleted = true WHERE id = $1', [id]);
    res.status(200).send('USER DELETED');
});

module.exports = router;