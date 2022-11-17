const user = document.getElementById("user");
const work = document.getElementById("work");
const saveWorkBtn = document.getElementById("saveWorkBtn");
const showtimeList = document.getElementById("showTimeList");

let dayOrNight = "day";

if (localStorage.getItem("timeSheet")) {
    console.log("Det finns LS");
} else {
    console.log("Finns inget LS");

    let timeSheet = [
        {id:1, user:"Janne", work: 7},
        {id:2, user:"Kalle", work: 2},
        {id:3, user:"Bengt", work: 18},
    ];

    localStorage.setItem("timeSheet", JSON.stringify(timeSheet));
}

saveWorkBtn.addEventListener("click", () => {

        // HÄMTA
        let timeSheet = JSON.parse(localStorage.getItem("timeSheet"));

        // SKAPA NYTT OBJEKT
        let newWorkTime = {
            id: timeSheet.length + 1,
            user: user.value,
            work: Number(work.value)
        }

        console.log("newWrokTime", newWorkTime);

        // ÄNDRA
        timeSheet.push(newWorkTime);

        // SPARA
        localStorage.setItem("timeSheet", JSON.stringify(timeSheet));
   

    console.log("timeSheet", timeSheet);

    printTimes();
})

function printTimes() {
    showtimeList.innerHTML = "";

    // HÄMTA
    let timeSheet = JSON.parse(localStorage.getItem("timeSheet"));
    console.log("hämtad från LS", timeSheet);

    timeSheet.map(work => {
        console.log("Tiderna för sig", work);

        let timeBox = document.createElement("div");
        timeBox.style.border = "1px solid black";
        timeBox.style.padding = "20px";
        timeBox.style.margin = "20px";

        if (work.work < 4) {
            timeBox.style.backgroundColor = "yellow"
        } else if (work.work >= 4 && work.work < 8) {
            timeBox.style.backgroundColor = "orange"
        } else {
            timeBox.style.backgroundColor = "red"
        }
    
        timeBox.id = work.id;
        timeBox.innerHTML = "<p>" + work.user + "<br/>" + work.work + "</p>";
        
        showtimeList.appendChild(timeBox);
    })
}

function printNightActivities() {
    showtimeList.innerHTML = "";

    showtimeList.insertAdjacentHTML("afterbegin", "<p>DU FÅR INTE SE TIDER PÅ NATTEN</p>");
}

// CONDITIONAL RENDERING
if (dayOrNight === "day") {
    printTimes();
} else {
    printNightActivities();
}

// INIT
