const express = require('express');
const router = express.Router();
const { getArticles, countVote } = require('../controller/newsController');

router.get('/articles', getArticles);
router.post('/vote', countVote);

module.exports = router;
