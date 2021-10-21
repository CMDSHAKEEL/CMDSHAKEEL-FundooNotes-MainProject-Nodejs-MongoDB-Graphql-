const mongoose = require('mongoose');
const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },

    noteId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'noteModel'
        }]
    },

    labelName: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('labelModel', labelSchema);