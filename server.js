const express = require('express')

//MongDB
const mongoose = require('mongoose')

//Import model & router
const Todo = require('./models/todo')
const todoRouter = require('./routes/todo')

//Method Override
const methodOverride = require('method-override')

const app = express()

//------------------------------------------------------------------------------

//Connect to mongo DB
mongoose.connect('mongodb://localhost/todo', {
    useNewUrlParser: true, useUnifiedTopology: true //useCreateIndex: true
})

//Check database connection
/*
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", error => {
        console.log("Your Error, error")
    })
*/
    
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {

    /*
    const todo = [{
        title: 'Today is good 1 weather',
        description: 'lorem...',
        createdAt: new Date()
    },
    {
        title: 'Today is good 2 weather',
        description: 'lorem...',
        createdAt: new Date()
    },
    {
        title: 'Today is good 2 weather',
        description: 'lorem...',
        createdAt: new Date()
    }]
    */

    const todo = await Todo.find().sort({ createdAt: 'desc' })

    res.render('todo/index', {todo: todo})
})


app.use('/todo', todoRouter)


app.listen(5000)

