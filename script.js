document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(link.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    // Header shadow on scroll
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow = "0 10px 35px rgba(0,0,0,.35)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    // Fade in animation
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(".feature, .room-card, .gallery-item, .contact-card").forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

    const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach(button => {

    button.addEventListener("click", () => {

        langButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });

});

});
