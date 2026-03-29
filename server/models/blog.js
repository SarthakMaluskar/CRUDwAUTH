const mongoose = require('mongoose');

const User = require('./user');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema)