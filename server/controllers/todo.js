const Todo = require('../models/todo')

class ControllerTodo {
    static create(req,res){
        const {title, description, type, due_date, userId} = req.body
        Todo.create({
            title,
            description,
            type,
            due_date,
            user: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(() => {
           
            res.status(201).json({
                message: 'data created'
            })
        })
        .catch(({errors})=> {
            res.status(401).json(errors)
        })
    }

    static readAll(req, res){
        const {userId} = req.body
        Todo.find({
            user: userId
        })
        .populate({path:'user', select:'name email role'})
        .then(datas => {
           res.status(200).json(datas)
        })
        .catch(({errors})=>{
            res.status(401).json(errors)
        })
    }

    static readOne(req, res){
        const {id} = req.params
        Todo.findOne({_id: id})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(({errors})=>{
            res.status(401).json(errors)
        })
    }

    static update(req, res){
        const {id} = req.params
        const {title, description, type, due_date} = req.body
        let obj = {
            updatedAt: new Date(),
            title,
            description,
            type,
            due_date
        }

        for (const key in obj) {
            if(obj[key] === undefined) delete obj[key]
        }

         Todo.findOneAndUpdate({_id: id }, obj)
         .then(() => {
            return Todo.findOne({_id: id})
         })
         .then(data => {
             res.status(200).json(data)
         })
         .catch(({errors})=> {
             res.status(204).json(errors)
         })
    }

    static delete(req, res){
        const {id} = req.params
        Todo.findOneAndDelete({_id: id})
        .then(data => {
            res.status(200).json(data)     
        })
        .catch(({errors})=>{
            res.status(204).json(errors)
        })
    }
}

module.exports = ControllerTodo