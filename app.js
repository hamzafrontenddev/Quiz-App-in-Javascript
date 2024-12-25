const questions = [
    {
        question: "What is HTML",
        answer: [
            {
                text: "Hyper Text Markup Language", correct: true
            },
            {
                text: "Markup Language", correct: false
            },
            {
                text: "Hyper Text Language", correct: false
            },
            {
                text: "Text Markup", correct: false
            },
        ]
    },

    {
        question: "What are HTML tags?",
        answer: [
            {
                text: "> and <", correct: false
            },
            {
                text: "< and >", correct: true
            },
            {
                text: "< and", correct: false
            },
            {
                text: " and >", correct: false
            }
        ]
    },
    {
        question: "Who is making the Web standards?",
        answer: [
            {
                text: "Google", correct: false
            },
            {
                text: "Mozilla", correct: false
            },
            {
                text: "World Wide Web Consortium (W3C)", correct: true
            },
            {
                text: "Microsoft", correct: false
            }
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answer: [
            {
                text: "h6", correct: false
            },
            {
                text: "h5", correct: false
            },
            {
                text: "h1", correct: true
            },
            {
                text: "h4", correct: false
            }
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answer: [
            {
                text: "br", correct: true
            },
            {
                text: "linebreak", correct: false
            },
            {
                text: "break", correct: false
            },
            {
                text: "br/", correct: false
            }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();