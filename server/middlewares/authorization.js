const Todo = require('../models/todo')
const User = require('../models/user')
const {verify} = require('../helpers/jwt')
const auth = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')){

        let payload = verify(req.headers.token, process.env.SECRET)
        const {email} = payload
        const {id} = req.params
        let promiseUser = User.findOne({email: email})
        let promiseTodo = Todo.findOne({_id: id})
        Promise.all([promiseUser, promiseTodo]).then(values => {
           const [user, todo] = values
           String(todo.user) === String(user._id) ? next() : res.status(204).json({message: 'User Unknown'})
        })
        
    }else {
        res.status(401).json({
            message: 'not authorize'
        })
    }
}

module.exports = auth 