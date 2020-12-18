const mongoose = require('./../db/index');

// add phone number
const userSchema = mongoose.Schema({
    name: {
        firstname: { type: String },
        midlename: { type: String },
        lastname: { type: String }
    },
    gender: { type: String },
    birthdate: { type: Date },
    contact: { type: Number },
    avatar: { 
        contentType: { type: String },
        image: { type: Buffer}
    },
    address: {
        address1: { type: String }, // street address
        address2: { type: String }, // street address line 2
        city: { type: String },
        state: { type: String },
        postalCode: { type: Number },
        country: { type: String }
    }
}, { timestamps: {} });

module.exports = mongoose.model('Users', userSchema);