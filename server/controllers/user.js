const User = require('../models/user')
const {compare} = require('../helpers/bycrpt')
const {sign} = require('../helpers/jwt')
class UserController {
    static create(req,res){
        const {name, email, password, role} = req.body
        User.create({
            name,
            email,
            password,
            role
        })
        .then(()=>{
            res.status(201).json({
                message: 'register success'
            })
        })
        .catch(({errors}) => {
            res.status(400).json(errors)
        })
    }

    static login(req, res){
        const {email, password} = req.body
        User.findOne({email})
        .then( data =>{
            if(!data){
                res.status(401).json({
                    message: 'email/password incorrect'
                })
            }else if(!compare(password, data.password)){
                res.status(401).json({
                    message: 'email/password incorect'
                })
            }else {
                const {email, name} = data
                const token = sign({email, name})
                res.status(200).json({token})
               
            }
        })
    }
}

module.exports = UserController