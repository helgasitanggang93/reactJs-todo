const router = require('express').Router()
const UserController = require('../controllers/user')
const TodoController = require('../controllers/todo')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')
router.post('/signup', UserController.create)
router.post('/login', UserController.login)

router.post('/todos', Authentication, TodoController.create)
router.get('/todos', Authentication, TodoController.readAll)
router.get('/todos/:id', Authentication, TodoController.readOne)
router.patch('/todos/:id', Authentication, Authorization, TodoController.update)
router.delete('/todos/:id', Authentication, Authorization ,TodoController.delete)
module.exports = router