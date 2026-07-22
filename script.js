const questions = [
    {
        question: "¿A qué nombre llega la guía de televisión de Chandler y Joey?",
        answers: [
            { text: "Chanandler Bong", correct: false },
            { text: "Miss Chanandler Bong", correct: true },
            { text: "Chandler Bang", correct: false }
        ]
    },
    {
        question: "¿Cuál era el número del apartamento de Monica antes de cambiarlo al 20?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "7", correct: false }
        ]
    },
    {
        question: "¿Cómo se llama el peluche de pingüino de Joey?",
        answers: [
            { text: "Hugsy", correct: true },
            { text: "Waddle", correct: false },
            { text: "Maurice", correct: false }
        ]
    },
    {
        question: "¿Cuántas páginas tenía la carta que Rachel le escribió a Ross?",
        answers: [
            { text: "18 páginas (por delante y por detrás)", correct: true },
            { text: "12 páginas", correct: false },
            { text: "21 páginas (por delante y por detrás)", correct: false }
        ]
    },
    {
        question: "¿Qué alter ego utiliza Joey cuando quiere ocultar su identidad?",
        answers: [
            { text: "Art Vandelay", correct: false },
            { text: "Ken Adams", correct: true },
            { text: "Clint West", correct: false }
        ]
    },
    {
        question: "¿De qué categoría es la toalla que Monica usa para 'uso diario'?",
        answers: [
            { text: "Categoría 4", correct: false },
            { text: "Categoría 11", correct: true },
            { text: "Categoría 7", correct: false }
        ]
    },
    {
        question: "¿Cuál es el segundo nombre de Chandler?",
        answers: [
            { text: "Muriel", correct: true },
            { text: "Eustace", correct: false },
            { text: "Barnaby", correct: false }
        ]
    },
    {
        question: "¿Qué idioma intenta aprender Joey para una audición (y lo hace fatal)?",
        answers: [
            { text: "Italiano", correct: false },
            { text: "Francés", correct: true },
            { text: "Español", correct: false }
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
    progressText.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('ios-btn');
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
    
    if (score === questions.length) {
        endScreen.classList.add('active');
        enviarCorreos();
    } else {
        // Si falla, vuelve a empezar
        alert(`Has acertado ${score} de ${questions.length}. ¡Tienes que hacer una puntuación perfecta!`);
        startGame();
    }
}

function enviarCorreos(mensaje) {
    const templateParams = {
        to_email_ali: 'alisonvega268@gmail.com',
        to_email_roi: 'rogeret06@gmail.com',
        message: mensaje
    };

    // --- MODO PRUEBA ---
    // En lugar de enviar el correo, lo imprimimos en la consola para comprobar que los datos llegan bien.
    console.log("🔵 MODO PRUEBA: Simulando envío de correo...");
    console.log("Destinatarios:", templateParams.to_email_ali, "y", templateParams.to_email_roi);
    console.log("Mensaje:", templateParams.message);
    
    // --- CÓDIGO REAL (Desactivado de momento) ---
    // Para cuando quieras que funcione de verdad, borra los símbolos /* y */ que envuelven el bloque de abajo.
    
    /*
    emailjs.send('service_zuu8pui', 'template_g1yuwd5', templateParams)
        .then(function(response) {
           console.log('✅ Correos enviados correctamente', response.status, response.text);
        }, function(error) {
           console.log('❌ Fallo al enviar los correos', error);
        });
    */
}
