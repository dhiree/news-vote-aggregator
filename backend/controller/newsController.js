
const Vote = require('../models/newsModel')
const axios = require('axios');
require('dotenv').config();


const getArticles = async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-09-15&to=2024-09-15&sortBy=popularity&apiKey=${process.env.API_KEY}`);
        const articles = response.data.articles.slice(0, 10);

        const articlesWithVotes = await Promise.all(articles.map(async (article) => {
            const vote = await Vote.findOne({ articleId: article.url });
            return {
                ...article,
                votes: vote ? vote.upvotes - vote.downvotes : 0,
                upvotes: vote ? vote.upvotes : 0,
                downvotes: vote ? vote.downvotes : 0
            };
        }));

        res.json(articlesWithVotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
}



const countVote = async (req, res) => {
    const { articleId, voteType, userIp } = req.body;

    try {
        let vote = await Vote.findOne({ articleId });

        if (!vote) {
            vote = new Vote({ articleId });
        }

        if (vote.voters.includes(userIp)) {
            return res.status(400).json({ message: 'You have already voted on this article' });
        }

        if (voteType === 'upvote') {
            vote.upvotes += 1;
        } else if (voteType === 'downvote') {
            vote.downvotes += 1;
        }

        vote.voters.push(userIp);
        await vote.save();

        res.json({ message: 'Vote recorded successfully', vote });
    } catch (error) {
        res.status(500).json({ message: 'Error recording vote', error });
    }
}

module.exports = {
    getArticles,
    countVote
};