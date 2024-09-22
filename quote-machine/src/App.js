import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchRandomQuote = async () => {
    const response = await fetch('andruxnet-random-famous-quotes.p.rapidapi.com');
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="quote-box">
      <div className="quote-text">
        <span id="text">{quote}</span>
      </div>
      <div className="quote-author">
        - <span id="author">{author}</span>
      </div>
      <div className="buttons">
        <a
          className="button"
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
          title="Tweet this quote!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width="25" height="25" src="https://img.icons8.com/ios/50/twitterx--v1.png" alt="twitterx--v1"/>
          Tweet
        </a>
        <button className="button" id="new-quote" onClick={fetchRandomQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};

export default App;
