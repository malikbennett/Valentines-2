export default class Scroll {
    static lastScroll = 0; // For throttling
    static heroHeading = document.getElementById("hero-heading");
    static heroP = document.getElementById("hero-p");
    static hearts = [...document.querySelectorAll('.hero-heart')];
    static layers = [
        document.getElementById("layer-2"),
        document.getElementById("layer-3"),
        document.getElementById("layer-4"),
        document.getElementById("layer-5"),
    ];
    // Static method for throttling
    static throttle(func, limit) {
        return function () {
            let now = new Date().getTime();
            if (now - Scroll.lastScroll >= limit) {
                Scroll.lastScroll = now;
                func();
            }
        };
    }

    // Static method for handling scroll events
    static scrollHandler = Scroll.throttle(() => { // Using Scroll.throttle here
        let value = window.scrollY;

        // Apply transformations
        Scroll.handleTransformations(Scroll.heroHeading, "Y", 3, value);
        Scroll.handleTransformations(Scroll.heroP, "Y", 2.25, value);

        Scroll.handleTransformations(Scroll.hearts[0], "Y", -0.95, value);
        Scroll.handleTransformations(Scroll.hearts[1], "Y", -0.85, value);
        Scroll.handleTransformations(Scroll.hearts[2], "Y", -3, value);
        Scroll.handleTransformations(Scroll.hearts[3], "Y", -2.15, value);

        Scroll.handleTransformations(Scroll.layers[0], "Y", 0.85, value);
        Scroll.handleTransformations(Scroll.layers[1], "X", -0.85, value);
        Scroll.handleTransformations(Scroll.layers[2], "X", 0.65, value);
        Scroll.handleTransformations(Scroll.layers[3], "Y", 0.15, value);

        // Smoothly hide text elements when scrolling past 650px
        let isHidden = value > 650;
        Scroll.heroHeading.parentElement.style.opacity = isHidden ? '0' : '1';
        Scroll.heroP.style.opacity = isHidden ? '0' : '1';
        Scroll.heroHeading.parentElement.style.visibility = isHidden ? 'hidden' : 'visible';
        Scroll.heroP.style.visibility = isHidden ? 'hidden' : 'visible';
    }, 16); // 16ms -> ~60fps

    // Static method for handling transformations
    static handleTransformations(element, direction, speed, value) {
        if (direction == 'x' || direction == 'X') {
            element.style.transform = `translateX(${value * speed}px)`;
        } else {
            element.style.transform = `translateY(${value * speed}px)`;
        }
    }
}
