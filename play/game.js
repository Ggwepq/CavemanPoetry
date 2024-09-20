let timeLeft;
let totalScore = 0;
let scoreOneCounter = 0;
let scoreThreeCounter = 0;
let skippedCounter = 0;
let cards = [];

document.addEventListener('DOMContentLoaded', () => {
    timeLeft = parseInt(sessionStorage.getItem('gameTime')) || 60;
    loadCards();
    updateTimer();
    showNextCard();
    startTimer();
});

function loadCards() {
    // In a real scenario, you'd load this from your server
    for (let i = 0; i < 390; i++) {
        cards.push(`../cards/card-images/Card ${i}.png`);
    }
    shuffleArray(cards);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    if (timeLeft <= 10) {
        timerElement.style.color = 'red';
    }
}

function showNextCard() {
    if (cards.length > 0) {
        const cardImage = document.getElementById('card-image');
        cardImage.src = `../cards/${cards.pop()}`;
    } else {
        endGame();
    }
}

function scoreCard(points) {
    totalScore += points;

    if (points == 1) scoreOneCounter++;
    if (points == 3) scoreThreeCounter++;
    if (points == -1) skippedCounter++;

    console.log(totalScore);

    showNextCard();
}

function endGame() {
    sessionStorage.setItem('finalScore', totalScore);
    sessionStorage.setItem('scoreOne', scoreOneCounter);
    sessionStorage.setItem('scoreThree', scoreThreeCounter);
    sessionStorage.setItem('skipped', skippedCounter);
    window.location.href = 'result.html';
}
