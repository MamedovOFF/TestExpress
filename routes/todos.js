const express = require('express');
const router = express.Router();
const todosController = require('../controller/todosController')
const authController = require('../controller/authController')

router.get('/', authController.auth, todosController.todosList);

router.post('/', authController.auth, todosController.createTodo);

router.delete('/:id', authController.auth, todosController.deleteTodo);

module.exports = router;
