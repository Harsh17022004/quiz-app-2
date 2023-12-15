const questions = [
    {
        question: "Which is the largest animal in the world",
        answere : [
            {text : "Shark",correct : false},
            {text : "Blue Whale",correct : true},
            {text : "Elephant",correct : false},
            {text : "Rat",correct : false}
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answere : [
            {text : "Vatican City",correct : true},
            {text : "Bhutan",correct : false},
            {text : "Nepal",correct : false},
            {text : "Sri Lanka",correct : false}
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answere : [
            {text : "Kalahari",correct : false},
            {text : "Gobi",correct : false},
            {text : "Sahara",correct : false},
            {text : "Antartica",correct : true}
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        answere : [
            {text : "Asia",correct : false},
            {text : "Africa",correct : false},
            {text : "Arctic",correct : false},
            {text : "Australia",correct : true}
        ]
    }
];

const questionElement = document.getElementById('questions');
const answereButton = document.getElementById('answere-buttons');
const nextButton = document.getElementById('next');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answere.forEach(answere =>{
        const button = document.createElement('button');
        button.innerHTML = answere.text;
        button.classList.add("btn");
        answereButton.appendChild(button);
        if(answere.correct){
            button.dataset.correct = answere.correct;
        }
        button.addEventListener("click", selectAnswere)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answereButton.firstChild){
        answereButton.removeChild(answereButton.firstChild);
    }
}

function selectAnswere(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answereButton.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled  = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length) {
        showQuestions();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();

