const questions = [
    {
        question: "¿A qué nombre llega la guía de televisión de Chandler y Joey?",
        answers: [
            { text: "Chanandler Bong", correct: false },
            { text: "Miss Chanandler Bong", correct: true },
            { text: "Chandler Bang", correct: false },
            { text: "Mr. Chanandler Bong", correct: false }
        ]
    },
    {
        question: "¿Cuántas categorías de toallas tiene Monica?",
        answers: [
            { text: "9", correct: false },
            { text: "11", correct: true },
            { text: "7", correct: false },
            { text: "14", correct: false }
        ]
    },
    {
        question: "¿Cuál es el alter ego que Phoebe usa recurrentemente?",
        answers: [
            { text: "Ken Adams", correct: false },
            { text: "Regina Phalange", correct: true },
            { text: "Princess Consuela", correct: false },
            { text: "Susie Moss", correct: false }
        ]
    }
];

const startButton = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressText = document.getElementById('progress-text');

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    progressText.innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');
    
    // Opcional: Solo mostrar los regalos si saca puntuación perfecta
    const giftReveal = document.querySelector('.gift-reveal');
    if (score === questions.length) {
        giftReveal.style.display = 'block';
    } else {
        giftReveal.innerHTML = `<p>Has acertado ${score} de ${questions.length}. ¡Vuelve a intentarlo para encontrar tus regalos!</p>
                                <button onclick="location.reload()">Reintentar</button>`;
    }
}
