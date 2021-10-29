const express = require('express');
const router = express.Router();
const User = require('../models/user');


const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'dbadmin',
    password: 'dbadmin',
    database: 'PsicoDB',
    port: '5432'
});


router.get('/get', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    console.log(users.rows);
    res.json(users);
})


router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/create', async (req, res) => {
    const { email, password, name, lastname } = req.body;
    const deleted = false;
    const blocked = false;
    const premium = false;
    const created = new Date();
    const updated = new Date();

    console.log("USER: " + email + " | " + password + " | " + name + " | " + lastname);

    const user = new User({ email, password, name, lastname, created, updated, deleted, blocked, premium });
    await user.save();

    res.json({success: 'CREATED'});
});

module.exports = router;