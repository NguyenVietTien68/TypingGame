const RANDOM_QUOTE = "https://api.quotable.io/random"
const quoteDisplay = document.getElementById("quote-display")
const quoteInput = document.getElementById("quote-input")
const complete = document.getElementById("complete");

let correct = true;

quoteInput.addEventListener('input', ()=>{
    const arrayDisplay = quoteDisplay.querySelectorAll('span')
    const arrayInput = quoteInput.value.split(' ')
    arrayDisplay.forEach((characterSpan, index)=>{
        console.log(arrayInput[index]);
        const character = arrayInput[index];
        console.log(characterSpan.innerText);
        console.log(character+" " == characterSpan.innerText);
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        } else if(character+" " == characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = true;
        } else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false;
        }
    })
    if(correct){
        complete.innerText ="CORRECT"
    }else{
        complete.innerText = "";
    }
})

function getRandomQuotes(){
   return fetch(RANDOM_QUOTE).then(response => response.json()).then(data => data.content)
}

async function getNextQuote(){
    const quote = await getRandomQuotes();
    // quoteDisplay.innerText = quote;
    complete.innerText = "";
    console.log(quote);
    quoteDisplay.innerHTML='';
    quote.split(' ').forEach(character => {
        const characterSpan = document.createElement('span')
        // characterSpan.classList.add('correct');
        characterSpan.innerText = character+" ";
        quoteDisplay.appendChild(characterSpan)
    })
    quoteInput.value = null;
}

getNextQuote();

