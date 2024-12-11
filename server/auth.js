const base64 = require('base-64');
require('dotenv').config()

function decodedCeredentials(authHeader) {
    const encodedCredentials = authHeader
        .trim()
        .replace(/Basic\s+/i, '');
    
    const decodedCeredentials = base64.decode(encodedCredentials);
    return decodedCeredentials.split(":");
}

module.exports = function authMiddleware(req, res, next) {
    const [username, password] = decodedCeredentials(req.headers.authorization || '');
    
    if (username === process.env.USERNAME && password === process.env.PASSWORD) { // feel free to put your USERNAME and PASWORD as strings
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="user_pages"')
    res.status(401).send('Authentication required')
}
