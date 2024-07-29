const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports= {
    createToken : (payload) => jwt.sign(payload, SECRET),
    verifyToken : (token) => jwt.verify(token, SECRET )
}