const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },
    email: {
        type: String,
        required: true,
    },
    googleId: {
        type: Number, 
        required: true, 
    },
    refreshToken: String,
    accessToken: String,
    phoneNumber: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: 'not-set',
    },
    stripeId: {
        type: String,
        default: null
    },
    subscriptionId: {
        type: String,
        default: '-1',
    },
    subscriptionStatus: {
        type: String,
        default: 'not chosen'
    },
    subscriptionType: {
        type: String,
        default: 'not chosen'
    },
    log: {
        type: [{
            date: Date,
            to: String,
            status: String,
            message: String, 
        }]
    },
    messageCount: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model('User', schema);
module.exports = User;