# Remindii
SaaS application that sends phone messages notifying clients about arranged visits.

You can see the app running on www.remindii.pl

## Technologies
### Frontend
- **React** *18*
- **Redux** *4*
- **Redux-Thunk** *2*
- **SCSS**
#### Main Packages
- **axios** for sending requests to the server API
- **js-cookie** for reading and setting cookies


### Backend
- **Node.js** *16*
- **Express** *4*
- MongoDB
#### Main Packages
- **passport** for user authentication
- **mongoose** for database operations
- **jwt** (jsonwebtoken) for generating user tokens
### APIs
- **Google OAuth 2.0** for logging with Google
- **Twilio API** for sending phone messages 
- **Stripe API** for accepting payments (in subscription mode)
- **Google Calendar API** for reading users' calendar events

## Features
- site is fully responsive
- users log in through Google
- users grant permission to read their calendar events
- the server is reading webhooks from stripe (about paid invoices)
- the Heroku-Scheduler runs scheduler.js file every day at 11AM which does the "job" (sending notifications to clients who have active subscription)