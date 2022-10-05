const express = require('express');

function setRoutes(app) {
    const authRoutes = require('../routes/auth');
    const userRoutes = require('../routes/user');
    const paymentRoutes = require('../routes/payment');

    app.use('/auth', authRoutes);
    app.use('/api/user', userRoutes); 
    app.use('/api/payment', express.raw({ type: 'application/json' }), paymentRoutes);
}

module.exports = setRoutes;