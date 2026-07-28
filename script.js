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

const translations = {

    en: {
        home: "Home",
        rooms: "Rooms",
        pricing: "Pricing",
        contact: "Contact",
        book: "Book Now"
    },

    fi: {
        home: "Etusivu",
        rooms: "Huoneet",
        pricing: "Hinnasto",
        contact: "Yhteystiedot",
        book: "Varaa"
    }

};

langButtons.forEach(button => {

    button.addEventListener("click", () => {

        langButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const lang = button.textContent.toLowerCase();

        document.getElementById("nav-home").textContent = translations[lang].home;
        document.getElementById("nav-rooms").textContent = translations[lang].rooms;
        document.getElementById("nav-pricing").textContent = translations[lang].pricing;
        document.getElementById("nav-contact").textContent = translations[lang].contact;
        document.getElementById("book-btn").textContent = translations[lang].book;

    });

});

    const rooms = [
{
    title:"Gangnam Lounge",
    size:"Up to 6 Persons",
    price:"Starting from €40/hour",
    text:"Luxury lounge with premium interiors and elegant golden lighting."
},
{
    title:"Seoul Lounge",
    size:"Up to 6 Persons",
    price:"Starting from €40/hour",
    text:"Elegant pink lounge with a modern Korean luxury atmosphere."
},
{
    title:"Hongdae Neon",
    size:"Up to 4 Persons",
    price:"Starting from €30/hour",
    text:"Vibrant purple neon room inspired by Hongdae nightlife."
},
{
    title:"Itaewon Gold",
    size:"Up to 4 Persons",
    price:"Starting from €30/hour",
    text:"Intimate luxury room with warm golden tones and premium finishes."
}
];

const slides = document.querySelectorAll(".carousel-slide");

const title = document.querySelector(".room-info h3");
const size = document.querySelector(".room-size");
const price = document.querySelector(".room-price");
const text = document.querySelector(".room-info p");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let current = 0;

function updateCarousel(){

    slides.forEach(slide=>slide.classList.remove("active"));

    slides[current].classList.add("active");

    title.textContent = rooms[current].title;
    size.textContent = rooms[current].size;
    price.textContent = rooms[current].price;
    text.textContent = rooms[current].text;
}

next.addEventListener("click",()=>{

    current++;

    if(current>=slides.length) current=0;

    updateCarousel();

});

prev.addEventListener("click",()=>{

    current--;

    if(current<0) current=slides.length-1;

    updateCarousel();

});

updateCarousel();
});
