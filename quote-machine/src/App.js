import React, { useState } from 'react';
import './App.css';
import quotesData from './quotes'; // Import the quotes array

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex];
    setQuote(randomQuote.text);
    setAuthor(randomQuote.author);
  };

  // Fetch the first quote when the component loads
  React.useEffect(() => {
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
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/twitterx--v1.png"
            alt="twitter"
          />
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
