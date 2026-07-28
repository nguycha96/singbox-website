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
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const title = document.querySelector(".room-info h3");
const size = document.querySelector(".room-size");
const price = document.querySelector(".room-price");
const text = document.querySelector(".room-info p");

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

let current = 0;

function updateCarousel(){

    slides.forEach((slide,index)=>{

        slide.className="carousel-slide";

        if(index===current){

            slide.classList.add("center");

        }else if(index===(current-1+slides.length)%slides.length){

            slide.classList.add("left");

        }else if(index===(current+1)%slides.length){

            slide.classList.add("right");

        }else{

            slide.classList.add("hidden");

        }

    });

    title.textContent = rooms[current].title;
    size.textContent = rooms[current].size;
    price.textContent = rooms[current].price;
    text.textContent = rooms[current].text;

}

next.onclick = ()=>{

    current=(current+1)%slides.length;
    updateCarousel();

};

prev.onclick = ()=>{

    current=(current-1+slides.length)%slides.length;
    updateCarousel();

};

updateCarousel();

    const carousel = document.querySelector(".room-carousel");
const cards = document.querySelectorAll(".carousel-slide");

let angle = 0;

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

const title = document.querySelector(".room-info h3");
const size = document.querySelector(".room-size");
const price = document.querySelector(".room-price");
const text = document.querySelector(".room-info p");

function updateCarousel(){

    cards.forEach((card,index)=>{

        const a=(360/cards.length)*index+angle;
        const rad=a*Math.PI/180;

        const x=Math.sin(rad)*280;
        const z=Math.cos(rad)*280;

        const scale=(z+280)/560*0.5+0.6;

        card.style.transform=
        `translateX(${x}px) translateZ(${z}px) scale(${scale})`;

        card.style.zIndex=Math.round(scale*100);

        if(Math.abs(a%360)<45 || Math.abs((a%360)-360)<45){

            title.textContent=rooms[index].title;
            size.textContent=rooms[index].size;
            price.textContent=rooms[index].price;
            text.textContent=rooms[index].text;

            card.classList.add("active");

        }else{

            card.classList.remove("active");

        }

    });

}

document.querySelector(".next").onclick=()=>{

    angle-=90;
    updateCarousel();

};

document.querySelector(".prev").onclick=()=>{

    angle+=90;
    updateCarousel();

};

updateCarousel();
    
});
