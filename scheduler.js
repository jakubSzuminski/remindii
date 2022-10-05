//Job scheduled by Heroku-Scheduler for every single day at 11:30 AM Polish Time
require('dotenv').config();
const { job } = require('./controllers/notifications');

//Sending notifications
console.log('Scheduler task started...');
job();
