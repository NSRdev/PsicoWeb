const mongoose = require('mongoose');
const { Schema } = mongoose;

const PublicationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: false,
        trim: true
    },
    lead: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
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
    premium: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Publication', PublicationSchema);