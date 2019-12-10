const Todo = require('../models/todo');
const User = require('../models/user');

class DeleteAll {
   static async deletemany() {
        try {
            const deleteUser = await User.deleteMany({})
            const deleteTodo = await Todo.deleteMany({})
            console.log(deleteTodo, deleteUser)
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

module.exports = DeleteAll