const express = require('express')

const router = express.Router()

const Todo = require('./../models/todo')


//New page
router.get('/:new', async (req, res) => {
    res.render('todo/new', { todo: new Todo() })
})

//Edit page
router.get('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    res.render('todo/edit', { todo: todo })
})

//Show page
router.get('/:slug', async (req, res) => {
    const todo = await Todo.findOne({ slug: req.params.slug })
    if(todo == null) res.redirect('/')
    res.render('todo/show', {todo: todo })
    
})

//Add record
router.post('/', async (req, res, next) => {
   
    req.todo = new Todo()
    next()

}, saveData('new'))

//Edit record
router.put('/:id', async (req, res, next) => {

    req.todo = todo.findById(req.params.id)
    next()

}, saveData('edit'))


//Delete
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//Save Data
function saveData(path){
    return async (req, res) => {

        let todo = req.todo
        todo.title = req.body.title
        todo.description = req.body.description
    
        try{
            todo = await todo.save()
            //alert("Add Successfully!")
            //res.redirect(`/todo/${ todo.slug }`)
            res.redirect('/')
            
        }
        catch(e){
            res.render('todo/new', {todo: todo})
        }
    }
}



//tell application to use this router
module.exports = router