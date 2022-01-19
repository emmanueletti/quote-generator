// Fetch quotes from API

// api quotes in the global scope
let apiQuotes = [];

async function getQuotes() {
  const API_URL = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    console.log(apiQuotes);
  } catch (error) {
    console.log(error);
  }
}

// On Load
getQuotes();
