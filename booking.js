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

    if(!selectedDate){
        return slots;
    }


    /*
       JavaScript:
       Sunday = 0
       Monday = 1
       Tuesday = 2
       ...
       Saturday = 6
    */

    const day =
        selectedDate.getDay();


    const openingMinutes =
        14 * 60;


    let closingMinutes;


    /*
       Monday–Thursday
       14:00–23:00
    */

    if(day >= 1 && day <= 4){

        closingMinutes =
            23 * 60;

    }


    /*
       Friday–Sunday
       14:00–02:00

       02:00 belongs to the
       following calendar day,
       so we use 26:00 internally.
    */

    else{

        closingMinutes =
            26 * 60;

    }


    /*
       Leave 1 hour for the booking
       AND 15 minutes for cleaning.

       Therefore the latest possible
       booking start is:

       closing time - 1h 15min
    */

    const latestStart =
        closingMinutes - 75;


    /*
       Create 15-minute start times.
    */

    for(
        let minutes = openingMinutes;
        minutes <= latestStart;
        minutes += 15
    ){

        let displayMinutes =
            minutes;


        /*
           After midnight, convert
           24:00 → 00:00
           24:15 → 00:15
           etc.
        */

        if(displayMinutes >= 24 * 60){

            displayMinutes -= 24 * 60;

        }


        const hours =
            Math.floor(displayMinutes / 60);

        const mins =
            displayMinutes % 60;


        const hourText =
            String(hours).padStart(2,"0");

        const minuteText =
            String(mins).padStart(2,"0");


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

    const roomCard =
        button.closest(".room-card");

    const timeButtons =
        roomCard.querySelectorAll(".time-slot");


    const [hours, minutes] =
        time.split(":").map(Number);

    const clickedMinutes =
        hours * 60 + minutes;


    /*
       Tarkistetaan, onko tällä huoneella
       jo valittu tunti.
    */

    const selectedButtons =
        roomCard.querySelectorAll(
            ".time-slot.selected"
        );


    /*
       Jos mitään ei ole vielä valittu,
       aloitetaan uusi yhden tunnin varaus.
    */

    if(selectedButtons.length === 0){

        selectOneHour(
            roomCard,
            clickedMinutes
        );

        return;
    }


    /*
       Selvitetään nykyisen valinnan
       ensimmäinen ja viimeinen vartti.
    */

    let selectedTimes = [];

    selectedButtons.forEach(slot => {

        const value =
            slot.dataset.time;

        if(!value){
            return;
        }

        const [h,m] =
            value.split(":").map(Number);

        selectedTimes.push(
            h * 60 + m
        );

    });


    const firstSelected =
        Math.min(...selectedTimes);

    const lastSelected =
        Math.max(...selectedTimes);


    /*
       Jos klikataan heti nykyisen varauksen
       perään tulevaa varttia, lisätään
       yksi tunti.
       
       Esimerkiksi:
       
       14:00–15:00
       klikataan 15:00
       ↓
       14:00–16:00
    */

    if(clickedMinutes === lastSelected + 15){

        const newEnd =
            lastSelected + 75;

        for(
            let minutes = lastSelected + 15;
            minutes < newEnd;
            minutes += 15
        ){

            const slot =
                findTimeButton(
                    timeButtons,
                    minutes
                );

            if(!slot){
                return;
            }

            slot.classList.add("selected");
        }

        return;
    }


    /*
       Jos klikataan heti ennen nykyistä
       varausta, lisätään tunti alkuun.
       
       Esimerkiksi:
       
       15:00–16:00
       klikataan 14:00
       ↓
       14:00–16:00
    */

    if(clickedMinutes === firstSelected - 15){

        const newStart =
            firstSelected - 60;

        for(
            let minutes = newStart;
            minutes < firstSelected;
            minutes += 15
        ){

            const slot =
                findTimeButton(
                    timeButtons,
                    minutes
                );

            if(!slot){
                return;
            }

            slot.classList.add("selected");
        }

        return;
    }


    /*
       Jos klikataan jotakin muuta kohtaa,
       aloitetaan uusi yhden tunnin valinta.
    */

    timeButtons.forEach(slot => {

        slot.classList.remove("selected");

    });


    selectOneHour(
        roomCard,
        clickedMinutes
    );
}

function selectOneHour(
    roomCard,
    startMinutes
){

    const timeButtons =
        roomCard.querySelectorAll(
            ".time-slot"
        );


    for(
        let minutes = startMinutes;
        minutes < startMinutes + 60;
        minutes += 15
    ){

        const slot =
            findTimeButton(
                timeButtons,
                minutes
            );

        if(!slot){
            return;
        }

        slot.classList.add("selected");
    }
}


function findTimeButton(
    buttons,
    minutes
){

    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;


    const time =
        `${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;


    return Array.from(buttons)
        .find(button =>
            button.dataset.time === time
        );
}

/* =====================
   INITIAL DRAW
===================== */

drawCalendar();

drawRooms();
