const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

// Smooth scrolling for navigation links
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
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