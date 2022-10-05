const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const populate = async (calendar) => {
    let response = await calendar.calendarList.list()
    response = response.data.items;
    response = response.map(c => c.id);

    console.log('a: populating finished');
    return response;
}

const getUserEvents = async (refresh_token, start, end) => {
    console.log('a: getting user events');
    oAuth2Client.setCredentials({ refresh_token });
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const userCalendars = await populate(calendar);

    let events = [];

    try {
        for(let i = 0; i < userCalendars.length; i++) {
            let response = await calendar.events.list({
                calendarId: userCalendars[i],
                auth: oAuth2Client,
                timeMin: start,
                timeMax: end,
                timeZone: 'Europe/Warsaw',
            });
            
            let newItems = response.data.items;
            newItems = newItems.map(i => ({
                title: i.summary,
                description: i.description || null,
                start: new Date(Date.parse(i.start.dateTime)),
                end: new Date(Date.parse(i.end.dateTime))
            })).filter(i => i.description); 

            if(newItems.length) events = events.concat(newItems);
        }

        console.log('a: finished.');

        return events;
    }
    catch(e) {
        console.log('Error at getEvents() => ', e);
        return;
    }
}

module.exports = {
    getUserEvents
}