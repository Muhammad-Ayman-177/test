const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const questions = [
    { text: 'السؤال 1', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 2', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 3', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 4', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 5', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 6', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 7', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 8', type: 'radio', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'] },
    { text: 'السؤال 9', type: 'text' },
    { text: 'السؤال 10', type: 'text' }
];

let surveyResults = {
    q1: { text: 'السؤال 1', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q2: { text: 'السؤال 2', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q3: { text: 'السؤال 3', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q4: { text: 'السؤال 4', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q5: { text: 'السؤال 5', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q6: { text: 'السؤال 6', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q7: { text: 'السؤال 7', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q8: { text: 'السؤال 8', options: ['اختيار 1', 'اختيار 2', 'اختيار 3'], responses: [0, 0, 0] },
    q9: { text: 'السؤال 9', responses: [] },
    q10: { text: 'السؤال 10', responses: [] }
    };
    
    let currentQuestionIndex = 0;
    
    app.get('/current-question', (req, res) => {
        res.json({ currentQuestion: currentQuestionIndex });
    });
    
    app.post('/update-question', (req, res) => {
        currentQuestionIndex = req.body.questionIndex;
        res.json({ success: true });
    });
    
    app.get('/get-questions', (req, res) => {
        res.json(questions);
    });
    
    app.post('/submit-response', (req, res) => {
        const { questionIndex, response } = req.body;
        const questionKey = `q${questionIndex + 1}`;
    
        if (questions[questionIndex].type === 'radio') {
            const optionIndex = questions[questionIndex].options.indexOf(response);
            if (optionIndex !== -1) {
                surveyResults[questionKey].responses[optionIndex]++;
            }
        } else if (questions[questionIndex].type === 'text') {
            surveyResults[questionKey].responses.push(response);
        }
    
        fs.writeFileSync('survey-results.json', JSON.stringify(surveyResults, null, 2));
    
        res.json({ success: true });
    });
    
    app.get('/survey-results', (req, res) => {
        res.json(surveyResults);
    });
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    