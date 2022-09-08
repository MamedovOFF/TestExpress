const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodosSchema = new Schema({
    title: String,
    body: String
})
module.exports = mongoose.model('Todos', TodosSchema)