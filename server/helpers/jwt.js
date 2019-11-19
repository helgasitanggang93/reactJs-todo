const jwt = require('jsonwebtoken')

module.exports = {
    sign: (payload) => {
        var token = jwt.sign(payload, process.env.SECRET)
        return token
    },
    verify: (token) => {
        return jwt.verify(token, process.env.SECRET)
    }
}