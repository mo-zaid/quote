const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiquotes = [];

//show load

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide load
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


function newquotes() {
    loading();
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    // check with author if its blank
    if (!quote.author) {
        autherText.textContent = "Unknown";
    }
    else {
        autherText.textContent = quote.author;
    }


    //style for larg quote

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

// set quote hide load
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiquotes = await response.json();
        newquotes();

    } catch (error) {
        prompt("error");
    }
}


//Tweet the quote

function tweetQuote(){
    const twitterURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
    window.open(twitterURL,'_blank');
}



// action listener
newQuoteBtn.addEventListener('click',newquotes);
twitterBtn.addEventListener('click',tweetQuote);




 getQuotes();