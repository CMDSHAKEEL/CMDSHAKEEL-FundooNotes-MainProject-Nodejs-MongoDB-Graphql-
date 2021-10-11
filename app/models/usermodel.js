const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
},
    {
        timestamps: true
    })

 module.exports = mongoose.model('UserData',PostSchema)
 