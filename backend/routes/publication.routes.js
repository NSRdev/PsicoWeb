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

// PUBLICACIÓN
router.get('/', async (req, res) => {
    const publications = await pool.query('SELECT * FROM publications WHERE deleted = false');

    res.status(200).json(publications.rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const publication = await pool.query('SELECT * FROM publications WHERE id = $1', [id]);

    res.status(200).json(publication.rows[0]);
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



// LIKES
router.get('/:id/likes', async (req, res) => {
    const id = req.params.id;

    const likes = await pool.query('SELECT COUNT(*) FROM likes WHERE deleted = false AND publication = $1', [id]);

    res.status(200).json(likes.rows[0]);
});

router.get('/:id/likes/:id', async (req, res) => {
    const publication_id = req.params.id;
    const user_id = req.params.id;

    const likes = await pool.query('SELECT * FROM likes WHERE publication = $1 AND "user" = $2', [publication_id, user_id]);

    res.status(200).json(likes.rows[0]);
});

router.post('/:id/likes/add', async (req, res) => {
    const publication_id = req.params.id;
    const user_id = req.body.user;
    const timestamp = new Date();
    let like;

    const exists = await pool.query('SELECT COUNT(*) FROM likes WHERE publication = $1 AND "user" = $2', [user_id, publication_id]);
    if (parseFloat(exists.rows[0].count) === 0) {
        like = await pool.query('INSERT INTO likes ("user", publication, created) VALUES ($1, $2, $3)', [user_id, publication_id, timestamp]);
    } else {
        like = await pool.query('UPDATE likes set deleted = false WHERE publication = $1 AND "user" = $2', [user_id, publication_id]);
    }
    res.status(200).json(like);
});

router.delete('/:id/likes/delete', async (req, res) => {
    const publication_id = req.params.id;
    const user_id = req.body.user;

    const likes = await pool.query('UPDATE likes SET deleted = true WHERE publication = $1 AND "user" = $2', [publication_id, user_id]);

    res.status(200).json(likes.rows[0]);
});



// COMENTARIOS
router.get('/:id/comments', async (req, res) => {
    const publication_id = req.params.id;

    const comments = await pool.query('SELECT * FROM comments WHERE deleted = false AND publication = $1 ORDER BY created DESC', [publication_id]);

    res.status(200).json(comments.rows);
});

router.post('/:id/comments/create', async (req, res) => {
    const { user, publication, content } = req.body;
    const timestamp = new Date();

    await pool.query('INSERT INTO comments ("user", publication, content, created) VALUES ($1, $2, $3, $4)', [user, publication, content, timestamp]);

    res.status(200).send('COMMENT CREATED');
});


module.exports = router;