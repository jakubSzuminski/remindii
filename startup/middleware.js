const express = require('express');
const cookieParser = require('cookie-parser');

function setupMiddleware(app) {
    app.use(cookieParser());

    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const cors = require('cors');
        app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    }
    
    app.use((req, res, next) => {
        if(req.originalUrl === '/api/payment/stripe-webhook') next();
        else express.json()(req, res, next);
    });    
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
}

module.exports = setupMiddleware;