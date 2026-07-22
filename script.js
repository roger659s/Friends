const questionImage = document.getElementById('question-image');

const questions = [
    {
        // Esta pregunta TIENE imagen
        question: "¿Qué escena icónica representa esta imagen?",
        image: "pivot.jpg", // Asegúrate de tener una imagen llamada así en tu carpeta
        answers: [
            { text: "El sofá de Ross", correct: true },
            { text: "La mudanza de Monica", correct: false },
            { text: "Joey comprando muebles", correct: false }
        ]
    },
    {
        // Esta pregunta NO TIENE imagen (funciona normal)
        question: "¿Cuál era el número del apartamento de Monica antes de cambiarlo al 20?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "7", correct: false }
        ]
    },
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

// Captura de elementos del DOM
const startButton = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressText = document.getElementById('progress-text');

const endTitle = document.getElementById('end-title');
const endScoreText = document.getElementById('end-score-text');
const successContent = document.getElementById('success-content');
const retryBtn = document.getElementById('retry-btn');
const emailMessageDisplay = document.getElementById('email-message-display');

let currentQuestionIndex = 0;
let score = 0;

// Eventos de los botones principales
startButton.addEventListener('click', startGame);

retryBtn.addEventListener('click', () => {
    endScreen.classList.remove('active');
    startGame();
});

// Funciones del juego
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
    
    // --- NUEVA LÓGICA DE IMAGEN ---
    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = 'block'; // Muestra la imagen
    } else {
        questionImage.style.display = 'none';  // Oculta la imagen si no hay
    }
    // ------------------------------

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
    endScreen.classList.add('active');
    
    endScoreText.innerText = `Has acertado ${score} de ${questions.length} preguntas.`;

    if (score === questions.length) {
        endTitle.innerText = "¡Prueba Superada!";
        successContent.style.display = "block";
        retryBtn.style.display = "none";

        const textoFinal = '¡Enhorabuena, Ali! Has superado el Trivial de nivel experto con una puntuación perfecta. Queda oficialmente demostrado que eres la mayor fan de la serie. Disfruta mucho de las flores. ¡Feliz cumpleaños! Te quiero muchísimo, Roi.';
        
        emailMessageDisplay.innerText = `"${textoFinal}"`;
        
        enviarCorreos(textoFinal);
    } else {
        endTitle.innerText = "¡Casi lo tienes!";
        successContent.style.display = "none";
        retryBtn.style.display = "block";
    }
}

// Función de simulación/envío de correos
function enviarCorreos(mensaje) {
    const templateParams = {
        to_email_ali: 'alisonvega268@gmail.com',
        to_email_roi: 'rogeret06@gmail.com',
        message: mensaje
    };

    console.log("🔵 MODO PRUEBA: Simulando envío de correo...");
    console.log("Destinatarios:", templateParams.to_email_ali, "y", templateParams.to_email_roi);
    console.log("Mensaje:", templateParams.message);
    
    /* 
    emailjs.send('service_zuu8pui', 'template_g1yuwd5', templateParams)
        .then(function(response) {
           console.log('✅ Correos enviados correctamente', response.status, response.text);
        }, function(error) {
           console.log('❌ Fallo al enviar los correos', error);
        });
    */
}
