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

// Get random int
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Show loading
function showLoading() {
  // Hidden property is present on any HTML DOM element!!!
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Generate new quote
function newQuote() {
  showLoading();
  // Pick random quote from api quotes array
  const quote = apiQuotes[getRandomInt(apiQuotes.length)];
  authorText.textContent = quote.author ?? 'Unknown';
  quoteText.textContent = quote.text;

  // Check quote length to determing styline
  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');

  hideLoading();
}

// Fetch quotes from API
async function getQuotes() {
  showLoading();
  const API_URL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

// Tweet a quote
function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  // Open twitter page in a new tab
  window.open(twitterURL, '_blank');
}

// On Load
getQuotes();
// showLoading();
// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuotes);
