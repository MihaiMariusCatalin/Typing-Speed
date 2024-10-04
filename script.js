const texts = ["The text is a corrupted version of the original and therefore does not mean anything in particular",
                "The book however where it originates discusses the philosophical views of Epicureanism, Stoicism, and the Platonism of Antiochus of Ascalon",
                "Random Text Generator is a web application which provides true random text which you can use in your documents or web designs",
                "Also when you use plain Lorem ipsum text, your design will look like a million other designs out there",
                "When we show a design to a client we want to have some text that doesn't mean anything in particular just to indicate that"]

const quoteDisplay = document.getElementById("quoteDisplay")
const quoteInput = document.getElementById("quoteInput")
quoteInput.addEventListener("input", checkLetters)

const THOUSAND = 1000;
const MAX_TIMER = 60;
let correctWords = 0;
let time = 0;

function generateRandomQuote() {
    const quote = texts[Math.floor(Math.random() * texts.length)]
    quoteDisplay.innerText = "";
    for (let i = 0; i < quote.length; ++i) {
        let quoteSpan = document.createElement("span")
        quoteSpan.innerText = quote[i]
        quoteDisplay.appendChild(quoteSpan)
    }
}
generateRandomQuote()

function checkLetters() {
    if (time === MAX_TIMER) {
        return
    }
    const textArray = document.querySelectorAll("span")
    const inputValue = quoteInput.value.split('')
    textArray.forEach((characterSpan, index) => {
        const character = inputValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('wrong')
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('wrong')
        } else if (character !== characterSpan.innerText) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('wrong')
        }
    })
    if (textArray.length === inputValue.length) {
        checkWords()
        document.getElementById('quoteInput').value = "";
        generateRandomQuote()
    }
}

function checkWords() {
    const words = document.getElementById('quoteDisplay').innerText.split(' ')
    const inputValue = quoteInput.value.split(' ')
    for (let i = 0; i < words.length; ++i) {
        if (words[i] === inputValue[i]) {
            ++correctWords
        }
    }
}

function increaseTime() {
    if (time === MAX_TIMER) {
        return
    }
    ++time;
    document.getElementById('timer').innerText = time
    if (time === MAX_TIMER) {
        checkWords()
        document.getElementById('correctWords').innerText = correctWords
        document.getElementById('wordsPerMinute').innerText = 
        (Math.round((correctWords / 60) * 100) / 100).toFixed(2)
    }
}

setInterval(increaseTime, THOUSAND)
