const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/psicoweb';

mongoose.connect(URI)
    .finally(db => console.log("Database connected successfully"))
    .catch(err => console.error(err));

module.exports = mongoose;