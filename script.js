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
    if (time == 60) {
        return
    }
    const array = document.querySelectorAll("span")
    const value = quoteInput.value.split('')
    array.forEach((characterSpan, index) => {
        const character = value[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('wrong')
        }
        else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('wrong')
        }
        else if (character != characterSpan.innerText) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('wrong')
        }
    })
    if (array.length == value.length) {
        checkWords()
        document.getElementById('quoteInput').value = "";
        generateRandomQuote()
    }
}

function checkWords() {
    const words = document.getElementById('quoteDisplay').innerText.split(' ')
    const value = quoteInput.value.split(' ')
    for (let i = 0; i < words.length; ++i) {
        if (words[i] == value[i]) {
            ++correctWords
        }
    }
}

function increaseTime() {
    if (time == 60) {
        return
    }
    ++time;
    document.getElementById('timer').innerText = time
    if (time == 60) {
        checkWords()
        document.getElementById('correctWords').innerText = correctWords
        document.getElementById('wordsPerMinute').innerText = (Math.round((correctWords / 60) * 100) / 100).toFixed(2)
    }
}

setInterval(increaseTime, 1000)
