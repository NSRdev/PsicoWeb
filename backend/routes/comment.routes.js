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


module.exports = router;