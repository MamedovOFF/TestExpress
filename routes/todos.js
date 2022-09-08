const express = require('express');
const Todos = require('../models/Todos')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Get TODOS');
});

router.post('/', function(req, res, next) {
    const todo = new Todos({ title: req.body.title, body: req.body.body });
    todo.save().then((response) => {
        res.send(response);
    })

});

router.delete('/', function(req, res, next) {
    res.send('delete TODOS');
});

module.exports = router;
