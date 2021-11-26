const mongoose = require('mongoose')

const marked = require('marked')
const slugify = require('slugify')


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

todoSchema.pre('validate', function(next){

    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    
    next()

})


module.exports = mongoose.model('Todo', todoSchema)