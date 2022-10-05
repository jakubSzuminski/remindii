const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;
const path = require('path');

const createProductionSetup = app => {  
    app.use(sslRedirect());
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/client/build/index.html'));
    });
}

module.exports = createProductionSetup;