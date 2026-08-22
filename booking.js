/* =====================
   BOOKING DATA
===================== */

const rooms = [
    {
        id: "gangnam",
        title: "Gangnam Lounge",
        size: "👥 1–6 Guests",
        price: "From €40 / hour",
        image: "images/gangnam.png"
    },
    {
        id: "seoul",
        title: "Seoul Lounge",
        size: "👥 1–6 Guests",
        price: "From €40 / hour",
        image: "images/seoul.png"
    },
    {
        id: "hongdae",
        title: "Hongdae Neon",
        size: "👥 1–4 Guests",
        price: "From €30 / hour",
        image: "images/hongdae.png"
    },
    {
        id: "itaewon",
        title: "Itaewon Gold",
        size: "👥 1–4 Guests",
        price: "From €30 / hour",
        image: "images/itaewon.png"
    }
];


/* =====================
   ELEMENTS
===================== */

const calendarDays =
    document.getElementById("calendarDays");

const monthTitle =
    document.getElementById("monthTitle");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");

const selectedDateTitle =
    document.getElementById("selectedDateTitle");

const roomsGrid =
    document.getElementById("roomsGrid");


/* =====================
   DATE
===================== */

const today = new Date();

today.setHours(0, 0, 0, 0);

let displayedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
);

let selectedDate = null;


/* =====================
   MONTH NAMES
===================== */

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =====================
   CALENDAR
===================== */

function drawCalendar(){

    calendarDays.innerHTML = "";

    const year =
        displayedDate.getFullYear();

    const month =
        displayedDate.getMonth();

    monthTitle.textContent =
        `${monthNames[month]} ${year}`;


    /*
       JavaScript Sunday = 0.
       We want Monday = 0.
    */

    const firstDay =
        new Date(year, month, 1).getDay();

    const mondayFirst =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    /*
       Empty cells before the
       first day of the month.
    */

    for(let i = 0; i < mondayFirst; i++){

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(empty);
    }


    /*
       Actual days.
    */

    for(let day = 1; day <= daysInMonth; day++){

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "calendar-day";

        button.textContent = day;


        const date =
            new Date(year, month, day);

        date.setHours(0, 0, 0, 0);


        /*
           Today
        */

        if(date.getTime() === today.getTime()){

            button.classList.add("today");
        }


        /*
           Past dates
        */

        if(date < today){

            button.classList.add("past");

            button.disabled = true;
        }


        /*
           Selected date
        */

        if(
            selectedDate &&
            date.getTime() === selectedDate.getTime()
        ){

            button.classList.add("selected");
        }


        /*
           Click
        */

        if(date >= today){

            button.addEventListener(
                "click",
                () => {

                    selectedDate =
                        new Date(date);

                    drawCalendar();

                    drawRooms();
                }
            );
        }


        calendarDays.appendChild(button);
    }
}


/* =====================
   MONTH NAVIGATION
===================== */

previousMonth.addEventListener(
    "click",
    () => {

        const previous =
            new Date(
                displayedDate.getFullYear(),
                displayedDate.getMonth() - 1,
                1
            );


        /*
           Don't allow going before
           the current month.
        */

        const currentMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        if(previous < currentMonth){

            return;
        }


        displayedDate = previous;

        drawCalendar();
    }
);


nextMonth.addEventListener(
    "click",
    () => {

        displayedDate =
            new Date(
                displayedDate.getFullYear(),
                displayedDate.getMonth() + 1,
                1
            );

        drawCalendar();
    }
);


/* =====================
   TIME GENERATION
===================== */

function createTimeSlots(){

    const slots = [];


    /*
       Example opening hours:
       12:00–23:00

       We create 15-minute
       possible start times.
    */

    const openingHour = 12;

    const closingHour = 23;


    for(
        let minutes = openingHour * 60;
        minutes < closingHour * 60;
        minutes += 15
    ){

        const hours =
            Math.floor(minutes / 60);

        const mins =
            minutes % 60;


        const hourText =
            String(hours).padStart(2, "0");

        const minuteText =
            String(mins).padStart(2, "0");


        slots.push(
            `${hourText}:${minuteText}`
        );
    }


    return slots;
}


/* =====================
   DEMO BOOKED TIMES
===================== */

function isBooked(roomId, time){

    /*
       This is ONLY temporary demo data.

       Later these values will come
       from the real booking database.
    */

    if(!selectedDate){

        return false;
    }


    const day =
        selectedDate.getDate();


    /*
       Different demo bookings for
       different rooms.
    */

    if(
        roomId === "gangnam" &&
        day % 3 === 0 &&
        (
            time === "18:00" ||
            time === "18:15" ||
            time === "18:30" ||
            time === "18:45"
        )
    ){

        return true;
    }


    if(
        roomId === "seoul" &&
        day % 4 === 0 &&
        (
            time === "16:00" ||
            time === "16:15" ||
            time === "16:30" ||
            time === "16:45"
        )
    ){

        return true;
    }


    if(
        roomId === "hongdae" &&
        day % 5 === 0 &&
        (
            time === "20:00" ||
            time === "20:15" ||
            time === "20:30" ||
            time === "20:45"
        )
    ){

        return true;
    }


    if(
        roomId === "itaewon" &&
        day % 6 === 0 &&
        (
            time === "14:00" ||
            time === "14:15" ||
            time === "14:30" ||
            time === "14:45"
        )
    ){

        return true;
    }


    return false;
}


/* =====================
   ROOMS
===================== */

function drawRooms(){

    if(!selectedDate){

        selectedDateTitle.textContent =
            "Select a date";

        roomsGrid.innerHTML = "";

        return;
    }


    const dateText =
        selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    selectedDateTitle.textContent =
        dateText;


    roomsGrid.innerHTML = "";


    rooms.forEach(room => {

        const card =
            document.createElement("article");

        card.className =
            "room-card";


        card.innerHTML = `

            <img
                class="room-image"
                src="${room.image}"
                alt="${room.title}"
            >

            <div class="room-info">

                <h3>${room.title}</h3>

                <div class="room-meta">
                    ${room.size}
                </div>

                <div class="room-price">
                    ${room.price}
                </div>

            </div>

            <div class="time-slots">

                <h4>
                    Available times
                </h4>

                <div class="time-grid"></div>

            </div>
        `;


        const timeGrid =
            card.querySelector(".time-grid");


        const slots =
            createTimeSlots();


        slots.forEach(time => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "time-slot";


            button.textContent =
                time;

           button.dataset.time =
              time;


            /*
               Temporary booked state
            */

            if(isBooked(room.id, time)){

                button.classList.add("booked");

                button.textContent = "×";

                button.disabled = true;

            }


            /*
               Available time
            */

            else{

                button.addEventListener(
                    "click",
                    () => {

                        selectTime(
                            room,
                            time,
                            button
                        );

                    }
                );
            }


            timeGrid.appendChild(button);
        });


        roomsGrid.appendChild(card);

    });
}


/* =====================
   SELECT TIME
===================== */

function selectTime(room, time, button){

    document
        .querySelectorAll(".time-slot.selected")
        .forEach(slot => {
            slot.classList.remove("selected");
        });

    const [hours, minutes] = time
        .split(":")
        .map(Number);

    const startMinutes =
        hours * 60 + minutes;

    const endMinutes =
        startMinutes + 60;

    const timeButtons =
        button
            .closest(".room-card")
            .querySelectorAll(".time-slot");

    timeButtons.forEach(slot => {

        const slotTime =
            slot.dataset.time;

        if(!slotTime){
            return;
        }

        const [slotHours, slotMinutes] =
            slotTime
                .split(":")
                .map(Number);

        const slotStart =
            slotHours * 60 + slotMinutes;

        if(
            slotStart >= startMinutes &&
            slotStart < endMinutes
        ){

            slot.classList.add("selected");

        }

    });

    console.log(
        "Selected booking:",
        {
            date: selectedDate,
            room: room.title,
            start: time,
            end:
                `${String(Math.floor(endMinutes / 60))
                    .padStart(2, "0")}:${String(endMinutes % 60)
                    .padStart(2, "0")}`
        }
    );
}


/* =====================
   INITIAL DRAW
===================== */

drawCalendar();

drawRooms();
