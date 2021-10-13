const mongoose = require('mongoose')
const NostSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
    }
})
const Post = mongoose.model('Notes',NostSchema)
module.exports = Post;