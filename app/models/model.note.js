const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
    userId:{
        type:'string'
    },
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
const Post = mongoose.model('Notes',NoteSchema)
module.exports = Post;