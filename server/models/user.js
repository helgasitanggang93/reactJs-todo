const mongoose = require('mongoose');
const {hash} = require('../helpers/bycrpt')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Email must be required'],
        validate: [{
            validator: (value) => {
                return User.model('User', userSchema)
                .findOne({email: value})
                .then(data =>{
                    if(data){
                        return false
                    }
                    return true
                })
                .catch(err =>{
                    if(err) return false
                })
            },
            message: 'email already registered'
        }, {
            validator: (value) => {
                let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                return regex.test(value)
            },
            message : 'Invalid format email'
        }]
    },
    password: String,
    role: String
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User