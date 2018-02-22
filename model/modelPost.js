const mongoose = require("mongoose"),
    fs = require("fs"),
    logPath = "./../log/server.log";

const scheemaPost = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: String
    },
    comment: [{
        commentFrom: {
            type: mongoose.Schema.ObjectId
        },
        commnetMessage: {
            type: String
        },
        commentLike: {
            type: Number
        }
    }],
    like: [{
        likeFrom: {
            type: mongoose.Schema.ObjectId
        }
    }]
});

module.exports = mongoose.model("Post", scheemaPost);