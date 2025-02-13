import './index.css';
import Scroll from './scroll.js';
import QuestionManager from './questions.js';
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
    console.log("document loaded");
    let question = document.getElementById("question");
    let questionNo = document.getElementById("quest-no");
    let optionBtns = [...document.querySelectorAll(".options")];
    let feedBack = document.getElementById("feedback");
    let wrongText = ['I cant believe you', "You need a lick", "Might as well disown you", "Suck My dick"];
    let rightText = ['Good Job', "Might Eat It :)", "Might as well Marry you", "Gonna Suck Your Dick"];
    let border = [...document.querySelectorAll(".valentine-borders")];
    let questionManager = new QuestionManager('questions.json', loadQuestion);

    function loadQuestion() {
        question.innerHTML = questionManager.getQuestion();

        // Reset button values
        for (let i = 0; i < optionBtns.length; i++) {
            const optionBtn = optionBtns[i];
            optionBtn.innerHTML = questionManager.getOptions()[i];
            optionBtn.value = ""; // Reset value here to prevent auto-correcting
            optionBtn.disabled = false; // Make sure button is re-enabled

            optionBtn.onclick = () => {
                optionBtn.value = i;
                optionBtn.disabled = true;
                console.log(optionBtn.disabled);

                setTimeout(() => {
                    optionBtn.disabled = false;
                }, 1000);

                if (parseInt(optionBtn.value) === questionManager.getAnswer()) {
                    feedBack.innerHTML = rightText[Math.floor(Math.random() * rightText.length)];
                    console.log(`
                    Quest No.: ${questionManager.getQuestionNumber()}
                    Quest ans: ${questionManager.getAnswer()}
                    Choice: ${optionBtn.value}
                `);

                    optionBtn.value = 99; // Temporary invalid value
                    questionManager.nextQuestion();

                    if (questionManager.lastQuestion()) {
                        loadValentines();
                    } else {
                        loadQuestion(); // Load next question
                    }
                } else {
                    feedBack.innerHTML = wrongText[Math.floor(Math.random() * wrongText.length)];
                }
            };
        }
    }


    function loadValentines() {
        border[0].parentElement.classList.remove('hidden');
        border[1].parentElement.classList.remove('hidden');

        question.parentElement.classList.remove("bg-lavendar", "shadow-lg");
        optionBtns[0].classList.add('hidden');
        optionBtns[1].innerHTML = "YESSS!!!";
        optionBtns[2].innerHTML = "no...?";
        questionNo.classList.add('hidden');
        question.innerHTML = 'Will you be my Valentines?';
        question.classList.remove("mb-4", "text-center", "text-4xl", "font-bold");
        question.classList.add('mb-6', "text-center", "text-2xl", "sm:text-4xl", "lg:mb-12", "lg:text-7xl", "text-lavendar");
        feedBack.classList.add('hidden');



    }

    window.addEventListener("scroll", Scroll.scrollHandler);
});
