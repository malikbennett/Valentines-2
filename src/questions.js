export default class QuestionManager {
    currQuestion = 1;
    questions = [];

    constructor(questions, onLoadCallback) {
        // Fetch the questions
        fetch(questions)
            .then(response => response.json())
            .then(data => {
                this.questions = [...data.questions];
                if (onLoadCallback) {
                    onLoadCallback();
                }
            })
            .catch(error => console.error('Error loading JSON:', error));
    }
    getCurrQuestion() {
        if (!this.questions.length) {
            console.error('Questions are not loaded yet');
            return null;
        }
        return this.questions[this.currQuestion - 1];
    }
    getQuestion() {
        return this.getCurrQuestion().question;
    }
    getOptions() {
        return this.getCurrQuestion().options;
    }
    getQuestionNumber() {
        return this.getCurrQuestion().No;
    }
    getFeedback(option) {
        return this.getCurrQuestion().feedback[option];
    }
    getAnswer() {
        return this.getCurrQuestion().correct;
    }
    nextQuestion() {
        if (this.currQuestion <= this.questions.length) {
            this.currQuestion++;
            this.getCurrQuestion();
        }
    }
    lastQuestion() {
        console.log(`cuurquest: ${this.currQuestion}, questamount: ${this.questions.length}`);
        console.log((this.currQuestion) === this.questions.length);
        return this.currQuestion === this.questions.length;
    }
    getRandomQuestion() {
        if (!this.questions.length) {
            console.error('Questions are not loaded yet');
            return null;
        }
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }
}
