const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
    },
    imgTitle: {
        type: String,
    },
    imgAlt: {
        type: String,
    }
})

module.exports = mongoose.model('Image', ImageSchema)