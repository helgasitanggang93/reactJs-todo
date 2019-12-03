const {OAuth2Client} = require('google-auth-library');
const {sign} = require('../helpers/jwt')
const User = require('../models/user')
const ggSignIn = (req, res, next) => {
   
    let tokenGoogle = req.headers.token
    let token
    let payload
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
        idToken : tokenGoogle,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket)=>{
        
         payload = ticket.getPayload();
         const {email, name} = payload
         token = sign({email, name})
         return User.findOne({email})
        
    })
    .then(dataUser => {
        
        if(!dataUser){
            req.body.payload = payload
            req.body.token = token
            next()
        }else if(dataUser) {
            res.status(201).json({token})
        }
    })
    .catch(({errors}) => {
        res.status(400).json(errors)
    })
}

module.exports = ggSignIn