const { generateUserToken } = require('./user');

const setToken = async (req, res) => {
    console.log('SET-TOKEN request received');

    const token = await generateUserToken(req.user);

    res.cookie('token', token);
    
    res.writeHead(301, {
        Location: req.user.subscriptionId == '-1' ? `${process.env.CLIENT_URL}/pricing` : `${process.env.CLIENT_URL}/dashboard`
    }).end();
}

module.exports = {
    setToken, 
}