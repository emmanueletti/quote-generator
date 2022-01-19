// Api Quotes state in the global scope
let apiQuotes = [];

// Pro-tip: cache references to DOM elements in the global scope
// instead of constantly performing expensing DOM searches
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function showLoadingSpinner() {
  // Hidden property is present on any HTML DOM element!!!
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function openURLInNewTab(URL) {
  window.open(URL, '_blank');
}

function pickRandomQuote() {
  return apiQuotes[getRandomInt(apiQuotes.length)];
}

function generateNewQuote() {
  showLoadingSpinner();
  const quote = pickRandomQuote();
  authorText.textContent = quote.author ?? 'Unknown';
  quoteText.textContent = quote.text;

  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');

  hideLoadingSpinner();
}

async function fetchQuotesFromAPI() {
  showLoadingSpinner();
  const API_URL = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    generateNewQuote();
  } catch (error) {
    console.log(error);
  }
}

function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  openURLInNewTab(twitterURL);
}

// Event listeners
window.addEventListener('load', fetchQuotesFromAPI);
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', fetchQuotesFromAPI);

// Naming Pro-Tip: can functions be named in a way that incorperates the comment?
// can they be named in a way that removes the need for comments?
// Can code blocks be wrapped in semantically clear and reuseable functions?
