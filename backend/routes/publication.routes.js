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
    const publications = await pool.query('SELECT * FROM publications');
    res.status(200).json(publications.rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const publication = await pool.query('SELECT * FROM publications WHERE id = $1', [id]);
    res.status(200).json(publication.rows);
});

router.post('/create', async (req, res) => {
    const { title, subtitle, heading, content, author, premium } = req.body;
    const timestamp = new Date();

    await pool.query('INSERT INTO publications (title, subtitle, heading, content, premium, author, created, updated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [title, subtitle, heading, content, premium, author, timestamp, timestamp]);

    res.status(200).send('PUBLICATION CREATED');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE publications SET deleted = true WHERE id = $1', [id]);
    res.status(200).send('PUBLICATION DELETED');
});


module.exports = router;