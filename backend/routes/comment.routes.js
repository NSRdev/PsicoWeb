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

router.get('/:id', async (req, res) => {
    const publication_id = req.params.id;
    const comments = await pool.query('SELECT * FROM comments WHERE deleted = false AND publication = $1', [publication_id]);
    res.status(200).json(comments.rows);
});

router.get('/:id/likes', async (req, res) => {
    const id = req.params.id;
    const likes = await pool.query('SELECT COUNT(*) FROM likes WHERE deleted = false AND publication = $1', [id]);
    res.status(200).json(likes.rows[0]);
});

router.post('/:id/likes/add', async (req, res) => {
    const publication_id = req.params.id;
    const user_id = req.body.user;
    const timestamp = new Date();
    const likes = await pool.query('INSERT INTO likes ("user", publication, created) VALUES ($1, $2, $3)', [user_id, publication_id, timestamp]);
    res.status(200).json(likes.rows[0]);
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