const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

// Manual smooth-scroll animation.
// We deliberately do NOT rely on CSS `scroll-behavior: smooth` or
// `scrollIntoView({ behavior: "smooth" })` because browsers automatically
// disable both when the OS/browser has "reduce motion" enabled
// (prefers-reduced-motion: reduce), causing the page to jump instantly
// with no animation. Animating via repeated `window.scrollTo` calls in
// a requestAnimationFrame loop is not affected by that setting, so the
// scroll animation always plays consistently.
function smoothScrollTo(targetElement) {
    const targetY = targetElement.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let startTime = null;

    function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeInOutQuad
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.addEventListener("click", function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    event.preventDefault();
    smoothScrollTo(targetElement);
    window.history.pushState(null, null, "#" + targetId);
});

window.addEventListener("scroll", function () {

    // Navbar resizing
    if (window.scrollY > 50) {
        navbar.classList.add("small");
    } else {
        navbar.classList.remove("small");
    }

    // Position indicator
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - navbar.offsetHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // Make sure Contact is active at the bottom
    if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
    ) {
        currentSection = "contact";
    }

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

// Carousel
const slides = document.querySelectorAll(".slide");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

nextButton.addEventListener("click", function () {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
});

previousButton.addEventListener("click", function () {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});

// Modal
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const projectButtons = document.querySelectorAll(".project-button");
const closeButton = document.querySelector(".modal-close");

projectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const projectCard = button.closest(".project-card");

        const title = projectCard.querySelector("h3").textContent;
        const description = projectCard.querySelector("p").textContent;

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modal.classList.add("active");
    });
});

closeButton.addEventListener("click", function () {
    modal.classList.remove("active");
});

// Close modal when clicking outside the modal content
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.classList.remove("active");
    }
});