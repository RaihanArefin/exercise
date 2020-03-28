const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    userId: String,
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }, 
    date: String
})
module.exports = mongoose.model('exercise', exerciseSchema)