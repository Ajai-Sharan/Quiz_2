let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let realAnswers = [];
let score = 0;
const totalQuestions = questions.length; // Store the original number of questions

// Shuffle questions array
questions = questions.sort(() => Math.random() - 0.5);

document.addEventListener("DOMContentLoaded", function() {
    displayQuestion();
    updateProgressBar();
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box, index) => {
        box.addEventListener("click", function() {
            const currentQuestion = questions[currentQuestionIndex];
            userAnswers.push(index + 1);
            realAnswers.push(currentQuestion.answer);
            questions.splice(currentQuestionIndex, 1);

            // Update score if the answer is correct
            if (index + 1 === currentQuestion.answer) {
                score += 5; // Each correct answer scores 5 points
                updateScore();
            }

            boxes.forEach((box, boxIndex) => {
                if (boxIndex + 1 === currentQuestion.answer) {
                    box.style.border = '3px solid black';
                    box.style.backgroundColor = 'green';
                } else {
                    box.style.backgroundColor = 'red';
                }
            });

            setTimeout(function() {
                if (questions.length > 0) {
                    boxes.forEach((box) => {
                        box.style.border = 'none';
                        box.style.backgroundColor = 'white';
                    });
                    displayQuestion();
                    updateProgressBar();
                } else {
                    endQuiz();
                }
            }, 3000);
        });
    });
});

function displayQuestion() {
    if (questions.length === 0) return;

    const question = questions[currentQuestionIndex];
    document.getElementById("title").innerText = question.question;
    const choices = document.querySelectorAll(".content");
    choices[0].innerText = question.choice1;
    choices[1].innerText = question.choice2;
    choices[2].innerText = question.choice3;
    choices[3].innerText = question.choice4;
}

function updateProgressBar() {
    const completedQuestions = totalQuestions - questions.length;
    const progress = (completedQuestions / totalQuestions) * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progress + '%';
}

function updateScore() {
    document.getElementById("score").innerText = score;
}

function calculateScore() {
    return score;
}

function endQuiz() {
    let finalScore = calculateScore();
    localStorage.setItem('quizScore', finalScore);
    window.location.href = "result.html";
}
