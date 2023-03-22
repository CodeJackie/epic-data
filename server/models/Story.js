const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: String,
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    }
})

module.exports = mongoose.model('Story', StorySchema)