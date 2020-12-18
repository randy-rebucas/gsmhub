// const mongoose = require('mongoose');
const mongoose = require('./../db/index');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true
    },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

authSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Auth', authSchema);