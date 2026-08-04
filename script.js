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
    menu: "Bar Menu",
    contact: "Contact",
    book: "Book Now"
},

    fi: {
    home: "Etusivu",
    rooms: "Huoneet",
    pricing: "Hinnasto",
    menu: "Juomavalikko",
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
        document.getElementById("pricing-title").textContent = translations[lang].pricing;
        document.getElementById("nav-menu").textContent = translations[lang].menu;
        document.getElementById("menu-title").textContent = translations[lang].menu;
        document.getElementById("nav-contact").textContent = translations[lang].contact;
        document.getElementById("book-btn").textContent = translations[lang].book;

    });

});

const rooms = [
{
    title:"Gangnam Lounge",
    size:"👥 1–6 Guests",
    price:"From €40 / hour",
    text:"Luxury lounge with premium interiors and elegant golden lighting."
},
{
    title:"Seoul Lounge",
    size:"👥 1–6 Guests",
    price:"From €40 / hour",
    text:"Elegant pink lounge with a modern Korean luxury atmosphere."
},
{
    title:"Hongdae Neon",
    size:"👥 1–4 Guests",
    price:"From €30 / hour",
    text:"Vibrant purple neon room inspired by Hongdae nightlife."
},
{
    title:"Itaewon Gold",
    size:"👥 1–4 Guests",
    price:"From €30 / hour",
    text:"Intimate luxury room with warm golden tones and premium finishes."
}
];

const slides = document.querySelectorAll(".card");

const title = document.getElementById("roomTitle");
const size = document.getElementById("roomSize");
const price = document.getElementById("roomPrice");
const text = document.getElementById("roomText");

const prev = document.querySelector(".carousel-arrow.left");
const next = document.querySelector(".carousel-arrow.right");

let current = 0;

function drawCarousel(){

    slides.forEach(slide=>{
        slide.className = "card";
    });

    const left = (current - 1 + slides.length) % slides.length;
    const right = (current + 1) % slides.length;
    const back = (current + 2) % slides.length;

    slides[current].classList.add("active");
    slides[left].classList.add("left");
    slides[right].classList.add("right");
    slides[back].classList.add("back");

    title.textContent = rooms[current].title;
    size.textContent = rooms[current].size;
    price.textContent = rooms[current].price;
    text.textContent = rooms[current].text;

    const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxGuests = document.getElementById("lightboxGuests");
const lightboxPrice = document.getElementById("lightboxPrice");
const lightboxText = document.getElementById("lightboxText");

if(lightbox.classList.contains("active")){

    lightboxImg.src = slides[current].querySelector("img").src;

    lightboxTitle.textContent = rooms[current].title;
    lightboxGuests.textContent = rooms[current].size;
    lightboxPrice.textContent = rooms[current].price;
    lightboxText.textContent = rooms[current].text;

}
}
    
next.onclick=()=>{

    current=(current+1)%slides.length;

    drawCarousel();

};

prev.onclick=()=>{

    current=(current-1+slides.length)%slides.length;

    drawCarousel();

};

drawCarousel();

console.log(slides);

    let startX = 0;

const carousel = document.querySelector(".room-carousel");

carousel.addEventListener("touchstart", (e) => {
    console.log("touchstart");
    startX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchend", (e) => {

    console.log("touchend");
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 40) return;

    if (diff > 0){
        next.click();
    }else{
        prev.click();
    }

}, { passive: true });

});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");

document.querySelectorAll(".carousel .card img").forEach((img,index) => {

    img.addEventListener("click", () => {

        current = index;

        drawCarousel();

        lightbox.classList.add("active");

    });

});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

lightNext.addEventListener("click", () => {

    current = (current + 1) % slides.length;

    drawCarousel();

});

lightPrev.addEventListener("click", () => {

    current = (current - 1 + slides.length) % slides.length;

    drawCarousel();

});
