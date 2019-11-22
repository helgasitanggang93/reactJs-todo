const mongoose = require('mongoose')
const {Schema} = mongoose
const todoSchema = new Schema({
    title: String,
    description:String,
    type: String,
    due_date: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    image: String,
    createdAt: Date,
    updatedAt: Date
})


const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo