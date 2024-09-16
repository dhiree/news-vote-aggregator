const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    articleId: String,
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    voters: [String]
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote