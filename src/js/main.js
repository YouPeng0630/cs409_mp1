const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

// Smooth scroll with JavaScript animation
function smoothScroll(element) {
    const target = element.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    const start = window.scrollY;
    const distance = target - start;
    const duration = 800; // 800ms animation
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const ease = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Handle hash changes
window.addEventListener("hashchange", function () {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            smoothScroll(targetElement);
        }
    }
});

// Also support clicking Learn More buttons
document.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && event.target.href.includes("#")) {
        const hash = event.target.getAttribute("href");
        if (hash && hash.startsWith("#")) {
            event.preventDefault();
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.location.hash = hash;
            }
        }
    }
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