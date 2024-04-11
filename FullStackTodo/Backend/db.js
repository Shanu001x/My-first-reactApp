const mongoose = require("mongoose");

// mongodb+srv://kirags123:8qPEa8KTKBEh2bss@cluster0.f3qlbuo.mongodb.net/todos
// .env
mongoose.connect("mongodb+srv://Shanu001x:EbcKs4B26TVwKgva@cluster0.x0xwf9w.mongodb.net/todos")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})  

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}