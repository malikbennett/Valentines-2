document.getElementById("yes-btn").addEventListener("click", () => {
    alert("Yay! I love you ❤️");
});

document.getElementById("no-btn").addEventListener("mouseover", () => {
    let btn = document.getElementById("no-btn");
    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.random() * window.innerHeight;
    btn.style.position = "absolute";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
});
