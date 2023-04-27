const {sign, verify} = require( 'jsonwebtoken');
const config = require('./config');

const generateToken = (id, exp="24h") => {
    const payload = {id};
    return sign(payload, config.key, {expiresIn: exp});
}

const saveToken = (token) => config.token = token;

const verifyToken = (token) =>
    verify(token, config.key);

module.exports = {
    generateToken,
    saveToken,
    verifyToken
}

