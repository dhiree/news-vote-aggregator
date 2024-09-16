import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function News() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleVote = async (articleId, voteType) => {
        try {
            await axios.post('http://localhost:5000/api/vote', {
                articleId,
                voteType,
                userIp: 'dummy-ip'
            });
            fetchArticles();
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">News Aggregator</h1>
            <div className="articles">
                {articles.map((article) => (
                    <div key={article.url} className="article-card">
                        <div className="article-content">
                            <h2 className="article-title">{article.title}</h2>
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="article-image"
                                />
                            )}
                            <div className="article-description">
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read full article
                                </a>
                            </div>
                        </div>
                        <div className="article-votes">
                            <button
                                onClick={() => handleVote(article.url, 'upvote')}
                                className="vote-button upvote-button"
                            >
                                <FontAwesomeIcon icon={faThumbsUp} className="vote-icon upvote-icon" />
                                <span className="vote-count">{article.upvotes}</span>
                            </button>
                            <button
                                onClick={() => handleVote(article.url, 'downvote')}
                                className="vote-button downvote-button"
                            >
                                <FontAwesomeIcon icon={faThumbsDown} className="vote-icon downvote-icon" />
                                <span className="vote-count">{article.downvotes}</span>
                            </button>
                            <div className="total-votes">
                                <span>Total votes: {article.votes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News