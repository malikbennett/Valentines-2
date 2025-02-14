import './index.css';
import Scroll from './scroll.js';
import QuestionManager from './questions.js';
import { gsap } from "gsap";
import confetti from "canvas-confetti";

document.addEventListener("DOMContentLoaded", () => {
    console.log("document loaded");
    let wrapper = document.getElementById("wrapper");
    let body = document.getElementsByTagName("body")[0];
    let final = document.getElementById("final");
    let questCard = document.getElementById("quest-card");
    let question = document.getElementById("question");
    let questionNo = document.getElementById("quest-no");
    let optionBtns = [...document.querySelectorAll(".options")];
    let feedBack = document.getElementById("feedback");
    let border = [...document.querySelectorAll(".valentine-borders")];
    let hearts = [...document.querySelectorAll('.trans-heart')];
    let questionManager = new QuestionManager('questions.json', loadQuestion);

    function loadQuestion() {
        questionNo.innerHTML = `#${questionManager.getQuestionNumber()}`;
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

                setTimeout(() => {
                    optionBtn.disabled = false;
                }, 1000);

                feedBack.innerHTML = questionManager.getFeedback(optionBtn.value);
                if (parseInt(optionBtn.value) === questionManager.getAnswer()) {
                    optionBtn.value = 99;
                    nextQuestAnimation(optionBtn);
                }
            };
        }
    }

    function loadValentines() {
        let tl = gsap.timeline();
        hearts.forEach((heart) => {
            tl.to(heart, {
                y: 1000, duration: 0.15, ease: "power1.out", opacity: 0,
                onComplete: () => {
                    heart.style.zIndex = '50';
                    heart.style.display = 'none';
                }
            }
            )
        });
        tl.to(questCard, {
            opacity: 0,
            duration: 0.25,
            ease: "none",
            onComplete: () => {
                border[0].parentElement.classList.remove('hidden');
                border[1].parentElement.classList.remove('hidden');
                body.classList.add("bg-lavendar");
                wrapper.classList.add("lavendar");
                body.classList.remove("bg-main-400");
                wrapper.classList.remove("bg-main-400");
                wrapper.classList.add("w-full");
                wrapper.classList.remove("max-w-[64rem]");
            }
        }, "<");
        tl.to(border[0], {
            y: -300,
            duration: 1,
            ease: "step",
        })
        tl.to(border[1], {
            y: 375,
            duration: 1,
            ease: "step",
            onComplete: () => {
                optionBtns[0].classList.add('hidden');
                optionBtns[0].parentElement.classList.remove("grow");
                optionBtns[1].innerHTML = "no...?";
                optionBtns[2].innerHTML = "YESSS!!!";
                question.innerHTML = 'Will you be my Valentines?';
                questionNo.parentElement.classList.add("hidden");

                question.classList.remove("text-2xl");
                question.classList.add("text-4xl", "sm:text-6xl", "lg:mb-12",
                    "text-main-400", "font-pacifico", "font-black");
                questCard.classList.remove("px-10", "py-6", "sm:min-h-[50vh]", "shadow-2xl", "hidden");
                questCard.classList.add("sm:max-w-[50%]", "p-6");
                feedBack.classList.add('hidden');
                tl.fromTo(questCard, {
                    scale: 1,
                }, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "none"
                })
            }
        }, "<"
        )
        optionBtns[2].onclick = yesAnimation;
        optionBtns[1].onmouseenter = moveButton;
        optionBtns[1].onclick = moveButton;
    }

    function yesAnimation() {
        let tl = gsap.timeline();

        // Show the final section
        final.classList.add("flex", "bg-main-400");
        final.classList.remove("hidden");

        // Animate the question card
        tl.to(questCard, {
            y: 500,
            duration: 1,
            ease: "power2.inOut",
        });

        // Fade in the final section
        tl.fromTo(
            final,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    // Add confetti
                    confetti({
                        particleCount: 100,
                        spread: 90,
                        origin: { y: 0.6 },
                    });
                    // Scroll to the final section
                    final.scrollIntoView({ behavior: "smooth" });
                }
            },
            "-=0.5" // Overlap with the previous animation
        );

        // // Play a sound effect
        // const audio = new Audio("/sounds/chime.mp3");
        // audio.play();
    }

    function moveButton() {

        let random = Math.floor(Math.random() * 100);

        optionBtns[1].style.position = "absolute";
        optionBtns[1].style.left = `${random}%`;
        optionBtns[1].style.top = `${random}%`;
    }

    function nextQuestAnimation(correctBtn) {
        let tl = gsap.timeline();
        tl.to(correctBtn, {
            backgroundColor: "#4CAF50",
            scale: 1.05,
            duration: 0.25,
            ease: "power1.out",
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(correctBtn, {
                        backgroundColor: "#B76E79",
                        scale: 1,
                        duration: 0.25,
                        ease: "power1.in",
                    });
                }, 250);
            }
        });


        tl.to(questCard, {
            x: 4000,  // Move off-screen to the right
            opacity: 0,
            duration: 1.5,
            delay: 2,
            ease: "none",
            onComplete: () => {
                questionManager.nextQuestion();
                questCard.classList.toggle("hidden");

                if (questionManager.lastQuestion()) {
                    gsap.set(questCard, { x: 0 }); // reset
                    loadValentines();
                } else {
                    gsap.set(questCard, { x: -4000 }); // Instantly move off-screen left & hide
                    questCard.classList.toggle("hidden");
                    loadQuestion(); // Load next question

                    gsap.to(questCard, {
                        x: 0,         // Move into view
                        opacity: 1,   // Fade in
                        duration: 1.5,
                        ease: "power2.out",
                    });
                }
            },
        });

    }

    function heartAnimation() {
        hearts.forEach((heart, index) => {
            // Randomize the duration and delay for a more natural effect
            const duration = 2 + Math.random() * 1; // 2-3 seconds
            const delay = Math.random() * 1; // 0-1 second delay

            // Create the animation
            gsap.to(heart, {
                y: "-=40", // Move up by 20px
                duration: duration,
                repeat: -1, // Repeat indefinitely
                yoyo: true, // Reverse the animation
                ease: "power1.inOut", // Smooth easing
                delay: delay, // Random delay
            });
        });
    }

    heartAnimation();
    window.addEventListener("scroll", Scroll.scrollHandler);
});
