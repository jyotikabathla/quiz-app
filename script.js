$(document).ready(function() {
    const quizData = [{
            question: "What is the capital of France?",
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon",
            correct: "c"
        },
        {
            question: "Which language is used for web development?",
            a: "Python",
            b: "HTML",
            c: "C++",
            d: "Java",
            correct: "b"
        },
        {
            question: "What does CSS stand for?",
            a: "Creative Style Sheets",
            b: "Cascading Style Sheets",
            c: "Computer Style Sheets",
            d: "Colorful Style Sheets",
            correct: "b"
        }
    ];

    const quizContainer = $('#quiz');
    const resultsContainer = $('#results');
    const submitButton = $('#submit');

    function buildQuiz() {
        const output = [];

        quizData.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion) {
                if (letter !== 'question' && letter !== 'correct') {
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} : ${currentQuestion[letter]}
                        </label>`
                    );
                }
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                                <div class="answers">${answers.join('')}</div>`
            );
        });

        quizContainer.html(output.join(''));
    }

    function showResults() {
        const answerContainers = quizContainer.find('.answers');
        let numCorrect = 0;

        quizData.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = ($(answerContainer).find(selector).val()) || '';

            if (userAnswer === currentQuestion.correct) {
                numCorrect++;
                $(answerContainer).css('color', 'green');
            } else {
                $(answerContainer).css('color', 'red');
            }
        });

        resultsContainer.html(`${numCorrect} out of ${quizData.length}`);
    }

    buildQuiz();

    submitButton.on('click', function() {
        showResults();
    });
});