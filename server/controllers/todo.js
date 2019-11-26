const Todo = require('../models/todo')
const cloudinary = require('cloudinary')

class ControllerTodo {
    static create(req,res){

        const {title, description, type, due_date, userId, image} = req.body
        Todo.create({
            title,
            description,
            type,
            due_date,
            user: userId,
            image: image,
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
        }, null, {sort:{_id:-1}})
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
        const {title, description, type, due_date,image} = req.body
        let obj = {
            updatedAt: new Date(),
            title,
            description,
            type,
            due_date,
            image
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

    static images(req, res){

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        if(!req.file){
            res.status(401).json({
                message: 'required image'
            })
        }else {
            cloudinary.uploader.upload(req.file.path)
            .then(result =>{
                res.status(200).json({
                    link: result.url
                })
            })
            .catch(() => {
                res.status(204).json({
                    message: 'problem with upload image'
                })
            })
        } 
    }
}

module.exports = ControllerTodo