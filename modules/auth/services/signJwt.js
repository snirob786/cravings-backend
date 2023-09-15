const jwt = require('jsonwebtoken')
module.exports = async (payload) => {
    payload.iat = Math.floor(Date.now() / 1000)
    try {
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
        return token
    } catch (error) {
        console.error(error);
    }

    return;

}