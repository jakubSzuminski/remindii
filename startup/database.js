const mongoose = require('mongoose');

const setupDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to the MongoDB'))
    .catch(e => console.error(e));
}

module.exports = setupDatabase;