// script.js

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add 'in-view' class to elements in viewport
function checkInView() {
    const elements = document.querySelectorAll(".animate");
    elements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add("in-view");
        }
    });
}

// Slideshow functionality
let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.opacity = "0";
        slide.classList.remove("active");
    });
    slides[slideIndex].style.opacity = "1";
    slides[slideIndex].classList.add("active");
    slideIndex = (slideIndex + 1) % slides.length;
}

// Listen for scroll and resize events
document.addEventListener("scroll", checkInView);
window.addEventListener("resize", checkInView);

// Smooth scroll for navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        const navHeight = document.querySelector("nav").offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - navHeight,
            behavior: "smooth",
        });
    });
});

// Function to handle fixed nav on scroll
function handleNavFixed() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    const headerBottom = header.getBoundingClientRect().bottom;

    if (window.scrollY >= headerBottom) {
        nav.classList.add("fixed");
    } else {
        nav.classList.remove("fixed");
    }
}

// Initial check
document.addEventListener("DOMContentLoaded", function () {
    checkInView();
    showSlides();
    setInterval(showSlides, 3000); // Change slide every 3 seconds
    handleNavFixed();
    window.addEventListener("scroll", handleNavFixed);
});
