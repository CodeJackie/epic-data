const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    Content: {
        type: String,
    },
    Date: {
        type: String,
    },
    ImgId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    }
})

module.exports = mongoose.model('Story', StorySchema)