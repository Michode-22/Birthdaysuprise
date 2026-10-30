
/* =========================================
   PASSWORD SETTINGS
========================================= */

// Frontend-only password.
// Remember: visitors can inspect the website source.
const DEMO_PASSWORD = "jmhalimawmagmahal";


/* =========================================
   ELEMENTS
========================================= */

const passwordScreen = document.getElementById("password-screen");
const birthdayContent = document.getElementById("birthday-content");

const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");

const passwordError = document.getElementById("password-error");

const togglePassword = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        eyeIcon.textContent = "◉";
        togglePassword.setAttribute("aria-label", "Hide password");

    } else {

        passwordInput.type = "password";
        eyeIcon.textContent = "♡";
        togglePassword.setAttribute("aria-label", "Show password");

    }

});


/* =========================================
   PASSWORD VALIDATION
========================================= */

passwordForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === DEMO_PASSWORD) {

        unlockWebsite();

    } else {

        passwordError.classList.add("show");

        passwordInput.value = "";
        passwordInput.focus();

    }

});


/* =========================================
   UNLOCK WEBSITE
========================================= */

function unlockWebsite() {

    passwordError.classList.remove("show");

    // Reveal the birthday website.
    birthdayContent.hidden = false;

    // Start the entrance transition.
    passwordScreen.classList.add("exit");

    // Prevent scrolling during the transition.
    document.body.style.overflow = "hidden";

    setTimeout(function () {

        passwordScreen.style.display = "none";

        // Restore scrolling.
        document.body.style.overflow = "";

        // Start scroll reveal animations.
        initializeScrollReveal();

        // Start floating petals.
        createFloatingPetals();

        // Start the initial reveal.
        revealVisibleSections();

    }, 1000);

}


/* =========================================
   SCROLL REVEAL
========================================= */

let revealObserver;

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

        return;
    }

    if (revealObserver) {
        revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

}


function revealVisibleSections() {

    const elements = document.querySelectorAll(".reveal");

    elements.forEach(function (element) {

        const position = element.getBoundingClientRect();

        if (position.top < window.innerHeight * 0.9) {
            element.classList.add("visible");
        }

    });

}


/* =========================================
   FLOATING PETALS
========================================= */

function createFloatingPetals() {

    const petalCount = 18;

    for (let i = 0; i < petalCount; i++) {

        const petal = document.createElement("div");

        petal.classList.add("floating-petal");

        const size = Math.random() * 9 + 6;
        const leftPosition = Math.random() * 100;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 12;

        petal.style.position = "fixed";
        petal.style.left = leftPosition + "%";
        petal.style.top = "-30px";

        petal.style.width = size + "px";
        petal.style.height = size * 1.4 + "px";

        petal.style.background = [
            "#f5bfd2",
            "#efabc4",
            "#f9d7e4",
            "#eeb4cc"
        ][Math.floor(Math.random() * 4)];

        petal.style.borderRadius = "100% 0 100% 0";
        petal.style.opacity = "0.65";
        petal.style.pointerEvents = "none";
        petal.style.zIndex = "5";

        petal.style.animation =
            `petalFall ${duration}s linear ${delay}s infinite`;

        document.body.appendChild(petal);

    }

}


/* =========================================
   FLOATING PETAL ANIMATION
========================================= */

const petalAnimation = document.createElement("style");

petalAnimation.textContent = `
    @keyframes petalFall {

        0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
            opacity: 0;
        }

        10% {
            opacity: 0.65;
        }

        50% {
            transform: translate3d(50px, 50vh, 0) rotate(180deg);
        }

        90% {
            opacity: 0.5;
        }

        100% {
            transform: translate3d(-40px, 110vh, 0) rotate(360deg);
            opacity: 0;
        }

    }
`;

document.head.appendChild(petalAnimation);


/* =========================================
   NAVIGATION
========================================= */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   INTERACTIVE BIRTHDAY LETTER
========================================= */

const openLetterButton = document.getElementById("open-letter");
const closeLetterButton = document.getElementById("close-letter");
const letterModal = document.getElementById("letter-modal");


function openBirthdayLetter() {

    letterModal.classList.add("open");
    letterModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function closeBirthdayLetter() {

    letterModal.classList.remove("open");
    letterModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


openLetterButton.addEventListener("click", openBirthdayLetter);

closeLetterButton.addEventListener("click", closeBirthdayLetter);


letterModal.addEventListener("click", function (event) {

    if (event.target === letterModal) {
        closeBirthdayLetter();
    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && letterModal.classList.contains("open")) {
        closeBirthdayLetter();
    }

});


// MAKE A WISH CELEBRATION
const celebrateButton = document.getElementById("celebrate-button");
const birthdayCake = document.getElementById("birthday-cake");
const candleFlame = document.getElementById("candle-flame");
const celebrationMessage = document.getElementById("celebration-message");

if (celebrateButton) {
    celebrateButton.addEventListener("click", () => {
        // Blow out the candle
        if (birthdayCake) {
            birthdayCake.classList.add("blown");
        }

        // Show birthday message
        if (celebrationMessage) {
            celebrationMessage.classList.add("show");
        }

        // Update button
        celebrateButton.textContent = "Wish Made! 💗";
        celebrateButton.disabled = true;

        // Create floating celebration petals
        for (let i = 0; i < 25; i++) {
            const petal = document.createElement("div");

            petal.textContent = ["🌸", "💗", "✨", "🌷"][
                Math.floor(Math.random() * 4)
            ];

            petal.style.position = "fixed";
            petal.style.left = Math.random() * 100 + "vw";
            petal.style.top = "-30px";
            petal.style.fontSize = "22px";
            petal.style.pointerEvents = "none";
            petal.style.zIndex = "9999";
            petal.style.animation = "wishFall ${3 + Math.random() * 3}s linear forwards";

            document.body.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 6500);
        }
    });
}


