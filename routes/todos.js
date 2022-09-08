const express = require('express');
const Todos = require('../models/Todos')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    Todos.find({}, function(err, todos) {
        const todosList = {};
        todos.forEach(function(todos) {
            todosList[todos._id] = todos;
        });
        res.send(todosList);
    });
});

router.post('/', function(req, res, next) {
    const todo = new Todos({ title: req.body.title, body: req.body.body });
    todo.save().then((response) => {
        res.send(response);
    })
});

router.delete('/:id', function(req, res, next) {
    Todos.deleteOne({_id: req.params.id}, (error) => {
        if (error) console.log(error)
        else res.send('delete TODOS')
    })
});

module.exports = router;
