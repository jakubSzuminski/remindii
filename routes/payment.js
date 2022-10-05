const express = require('express');
const router = express.Router();

const { createCheckoutSession, createPortalSession, handleWebhook } = require('../controllers/payments');

router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-portal-session', createPortalSession);
router.post('/stripe-webhook', handleWebhook);

module.exports = router;