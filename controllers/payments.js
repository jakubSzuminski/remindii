const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

const products = require('../config/products');
const User = require('../models/user');

const createCheckoutSession = async (req, res) => {
    console.log('PAYMENT Checkout request received...');

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send('Niepoprawny token. Zaloguj się ponownie.').end();

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if(!user) return res.status(401).send('Nie znaleziono takiego użytkownika. Spróbuj zalogować się ponownie').end();

    const price = (req.body.code == 1 ? products.LITE : (req.body.code == 2 ? products.STANDARD : products.GIANT));

    const session = await stripe.checkout.sessions.create({
        locale: 'pl',
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/success`,

        customer: user.stripeId,

        payment_method_types: ['card'],
        line_items: [{ price, quantity: 1 }],
        mode: 'subscription'

    });

    res.status(200).json(session.url).end();
}

const createPortalSession = async (req, res) => {
    console.log('CREATE-PORTAL-SESSION Request received');
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send('Niepoprawny token. Zaloguj się ponownie');

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(_id, 'stripeId');

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeId,
            return_url: `${process.env.CLIENT_URL}/dashboard`,
            locale: 'pl'
        });
        
        res.status(200).json({ location: portalSession.url }).end();
    }
    catch(e) {
        console.log(e);
        res.status(401).send('Zaloguj się ponownie');
    }
}

const handleWebhook = async (req, res) => {
    console.log('WEBHOOK received.');

    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } 
    catch (e) {
        console.log('error', e.message);
        res.status(400);
        return;
    }

    data = event.data;

    switch(event.type) {
        case 'invoice.paid':
            console.log('INVOICE PAID webhook');
            
            const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
            const planprice = event.data.object.lines.data[0].plan.id;

            let subType = 0;
            switch(planprice) {
                case products.LITE:
                    subType = 1;
                    break;
                case products.STANDARD:
                    subType = 2;
                    break;
                case products.GIANT:
                    subType = 3;
                    break;
                default: 
                    subType = 0;
                    break;
            }

            await User.findOneAndUpdate({ 'stripeId': event.data.object.customer }, {
                subscriptionId: event.data.object.subscription,
                subscriptionStatus: subscription.status, 
                subscriptionType: subType,
                messageCount: 0
            });
            
            break;
        default: 
            console.log('other eventtype');
            break;
    }

    res.status(200).end();
}

module.exports = {
    createCheckoutSession,
    createPortalSession,
    handleWebhook
}