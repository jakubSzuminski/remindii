const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const User = require('../models/user');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.NODE_ENV === 'production' ?  process.env.DOMAIN_URL : 'http://localhost:5000'}/auth/google/callback`, 
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
    },

    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ 'googleId' : profile.id });
        if(existingUser) {
            console.log('this user is already in the database');
            return done(null, existingUser);
        } 

        const user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            refreshToken: refreshToken,
        });

        const customer = await stripe.customers.create({
            _id: user._id, 
            name: profile.displayName,
            email: profile.emails[0].value,
        });

        user.stripeId = customer.id;
        await user.save();

        return done(null, user);
    }
));
