let currentQuestion = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/current-question')
        .then(response => response.json())
        .then(data => {
            currentQuestion = data.currentQuestion;
            fetch('/get-questions')
                .then(response => response.json())
                .then(data => {
                    questions = data;
                    showQuestion();
                });
        });

    document.getElementById('prevQuestion').addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
            updateQuestionOnServer();
        }
    });

    document.getElementById('nextQuestion').addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
            updateQuestionOnServer();
        }
    });
});

function showQuestion() {
    const container = document.getElementById('surveyContainer');
    container.innerHTML = '';
    const question = questions[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<p>${question.text}</p>`;

    if (question.type === 'radio') {
        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="radio" name="question${currentQuestion}" value="${option}"> ${option}
            `;
            questionElement.appendChild(optionElement);
        });
    } else if (question.type === 'text') {
        questionElement.innerHTML += `<input type="text" name="question${currentQuestion}">`;
    }

    container.appendChild(questionElement);
    document.getElementById('thankYouMessage').style.display = 'none';

    document.getElementById('nextQuestion').disabled = currentQuestion >= questions.length - 1;
}

function updateQuestionOnServer() {
    fetch('/update-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionIndex: currentQuestion }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
