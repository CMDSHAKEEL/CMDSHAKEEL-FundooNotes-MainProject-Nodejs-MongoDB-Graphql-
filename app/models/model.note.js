const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
   
    email:{
      type:'string',
    },
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
    }
})
const Post = mongoose.model('Notess',NoteSchema)
module.exports = Post;