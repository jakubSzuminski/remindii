const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const products = require('../config/products');
const User = require('../models/user');

const { formatDate } = require('./helpers');

const generateUserToken = user => {
    try {
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: user.message,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionType: user.subscriptionType,
            log: user.log.slice(0, 3).map(i => ({ date: formatDate(i.date), to: i.to })),
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return token;
    }
    catch(e) {
        console.log('Token generation failed.');
        return null;
    }
}

const updateUserSubscriptionInformation = async (userID, subscriptionID) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionID);
    
    let subscriptionType = -1;
    switch(subscription.plan.id) {
        case products.LITE:
            subscriptionType = 1;
            break;
        case products.STANDARD:
            subscriptionType = 2;
            break;
        case products.GIANT:
            subscriptionType = 3;
            break;
        default:
            subscriptionType = 0;
            break;
    }

    let status = '';
    if(subscription.cancel_at) {
        const today = new Date();
        const date = new Date(subscription.cancel_at * 1000);

        if(today < date) {
            const dateString = formatDate(date);
            status = `canceled;${dateString}`;
        }
        else status = 'canceled;inactive';
    } else {
        status = subscription.status;
    }
    
    const updated = await User.findByIdAndUpdate(userID, { subscriptionType, subscriptionStatus: status });
    return updated;
}

const getUserData = async (req, res) => {
    console.log('GET user data');

    const token = req.headers.authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(_id);
        if(!user) return res.status(500).send('Użytkownik nie znaleziony').end();

        let newToken = null;

        if(user.subscriptionId == '-1') newToken = await generateUserToken(user);
        else newToken = await generateUserToken(await updateUserSubscriptionInformation(user.id, user.subscriptionId));
        
        if(newToken) res.json(newToken);
        return;
    }
    catch(e) {
        console.log(e);
    }

    res.status(401).send('Zaloguj się.');
}

const getUserLog = async (req, res) => {
    console.log('GET USER LOG');

    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        
        const log = await User.findById(_id, '-_id log');
        const logResponse = log.log.map(item => ({
            date: formatDate(item.date, true),
            to: item.to
        }));

        res.json(logResponse).end();
        return;
    }
    catch(e) {
        console.log(e);
        res.status(401).send('Niepoprawny token bądź użytkownik nie znaleziony.').end();
    }
}

const updateUserMessage = async (req, res) => {
    console.log('UPDATE user message request received.');
    const token = req.headers.authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        await User.findByIdAndUpdate(_id, { message: req.body.newMessage});
        res.status(200).end();
    } 
    catch(e) {
        res.status(400).send(e.message).end();
    }
}

module.exports = {
    generateUserToken,
    getUserData, 
    getUserLog,
    updateUserMessage
};