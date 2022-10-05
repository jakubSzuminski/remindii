const express = require('express');
const router = express.Router();

const { getUserData, getUserLog, updateUserMessage } = require('../controllers/user');

router.get('/get-user-data', getUserData); 
router.get('/get-user-log', getUserLog); 
router.post('/update-user-message', updateUserMessage);

module.exports = router;