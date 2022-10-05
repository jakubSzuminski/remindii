const nodemailer = require('nodemailer');
const twilio = require('twilio')(process.env.TWILIO_SECRET, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = (to, text, subject) => {
    return {
        from: myEmail,
        to,
        subject,
        text
    }
}

const sendNotification = (to, text, subject) => {
    try {
        transporter.sendMail(mailOptions(to, text, subject));
        return true;
    } catch (e) {
        return false;
    }
}

const sendUserWarning = (clientEmail) => {
    sendNotification(clientEmail, 'Osiągnąłeś limit SMSów w tym miesiącu. Zaktualizuj plan na wyższy żeby Twoje powiadomienia nadal dochodziły do klientów.', 'Remindii - Ostrzeżenie o Limicie SMSów');
}

const sendPhoneNotification = (to, text) => {
    twilio.messages 
      .create({ 
         body: text,  
         messagingServiceSid: process.env.TWILIO_SERVICE_ID,      
         to: to 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}


//JOB
//1 - iterate through users
//2 - iterate through calendars
//3 - send notifications
//4 - create a 'sent notifications log'

const User = require('../models/user');

const { getUserEvents } = require('./calendar');
const { formatMessage } = require('./helpers');

const validatePhoneNumber = require('validate-phone-number-node-js');
const validator = require('email-validator');
const { LITE_LIMIT, STANDARD_LIMIT, GIANT_LIMIT } = require('../config/products');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const sendNotifications = (events, message) => {
    console.log('SENDING NOTIFICATIONS');

    let log = [];

    for(const event of events) {
        //STEP 1: get the phone number
        if(!event.description) continue;
        const num = event.description.split('\n')[0];

        //STEP 2: validate the phone number 
        if(!validatePhoneNumber.validate(num)) continue;

        //STEP 3: send the SMS
        const messageToSent = formatMessage(message, event.start); 
        const result = sendPhoneNotification(num, messageToSent);
        if(result) {
            log.push({
                date: new Date(),
                to: num,
                status: 'sent',
                message: messageToSent
            });
        }
    }

    return log;
}

const job = async () => {
    console.log('Starting a job');

    const users = await User.find();

    for(const user of users) {
        console.log('analyzed user: ', user);
        
        //STEP 1: checking if paid & message set
        try {
            const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
            if(subscription.status != 'active') continue;
        }   
        catch(e) {
            continue;
        }

        console.log('subscription passed');

        if(user.message === 'not-set' || '') continue;
        if(user.subscriptionType == 1 && user.messageCount > LITE_LIMIT) sendUserWarning(user.email);
        if(user.subscriptionType == 2 && user.messageCount > STANDARD_LIMIT) sendUserWarning(user.email);
        if(user.subscriptionType == 3 && user.messageCount > GIANT_LIMIT) sendUserWarning(user.email);
        
        console.log('message count passed');

        //STEP 2: getting the events
        const start = new Date();
        start.setDate(start.getDate() + 1);
        start.setHours(0)
        start.setMinutes(0);

        const end = new Date(start);
        end.setHours(23);
        end.setMinutes(59);

        const events = await getUserEvents(user.refreshToken, start, end);

        console.log(events);

        //STEP 3: sending notifications
        const log = sendNotifications(events, user.message);
        await User.findByIdAndUpdate(user.id, { log: user.log.concat(log), messageCount: user.messageCount + log.length() });
    }

    console.log('job done.');
}

module.exports = {
    sendNotification,
    job
}
