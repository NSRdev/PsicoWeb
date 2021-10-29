const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true
    },
    updated: {
        type: Date
    },
    deleted: {
        type: Boolean,
        required: true
    },
    blocked: {
        type: Boolean,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);