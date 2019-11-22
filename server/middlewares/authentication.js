const {verify} = require('../helpers/jwt')
const User = require('../models/user')

const isLogin = (req, res, next) => {
    let payload = verify(req.headers.token, process.env.SECRET)
    if(req.headers.hasOwnProperty('token')){
        User.findOne({
            email: payload.email
        })
        .then(data => {
            if(data){
                req.body.userId = data._id
                next()
            }else {
                res.status(401).json({
                    message: 'not authentication'
                })
            }
        })
        .catch(({errors}) => {
            res.status(401).json(errors)
        })
        
    }else {
        res.status(201).json({
            message: 'please login or register'
        })
    }
}

module.exports = isLogin