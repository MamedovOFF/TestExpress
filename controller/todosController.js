const Todos = require("../models/Todos");

exports.todosList = (req, res) => {
    Todos.find({}, function(err, todos) {
        const todosList = {};
        todos.forEach(function(todos) {
            todosList[todos._id] = todos;
        });
        res.send(todosList);
    });
}

exports.createTodo = (req, res) => {
    const { title, body } = req.body;
    const todo = new Todos({ title, body });
    todo.save().then((response) => {
        res.send(response);
    })
}

exports.deleteTodo = (req, res) => {
    Todos.deleteOne({_id: req.params.id}, (error) => {
        if (error) console.log(error)
        else res.send('delete TODOS')
    })
}