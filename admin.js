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
                    updateCurrentQuestionDisplay();
                    showQuestions();
                });
        });

    document.getElementById('prevQuestionAdmin').addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestionOnServer();
        }
    });

    document.getElementById('nextQuestionAdmin').addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            updateQuestionOnServer();
        }
    });
});

function updateCurrentQuestionDisplay() {
    document.getElementById('currentQuestionDisplay').textContent = `السؤال الحالي: ${currentQuestion + 1}`;
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
        updateCurrentQuestionDisplay();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.text} (${question.type})</p>`;
        container.appendChild(questionElement);
    });
}
