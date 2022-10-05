const express = require('express');
const router = express.Router();

const passport = require('passport');

const { setToken } = require('../controllers/auth');

router.get('/google', passport.authenticate('google', { accessType: 'offline' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed', failureMessage: true, session: false, accessType: 'offline' }), setToken);

module.exports = router;