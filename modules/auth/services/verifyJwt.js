const jwt = require('jsonwebtoken')
module.exports = async (token) => {
    try {
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return decodedToken
    } catch (error) {
        console.error(error);
    }

    return;

}