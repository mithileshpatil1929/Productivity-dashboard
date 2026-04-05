function openFeature() {
  var allElem = document.querySelectorAll(".elem");
  var allfullElempage = document.querySelectorAll(".fullElem");
  var allfullElempagebackbtn = document.querySelectorAll(".fullElem .back");
  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allfullElempage[elem.id].style.display = "block";
    });
  });
  allfullElempagebackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allfullElempage[back.id].style.display = "none";
    });
  });
}
openFeature();
function Todolist() {
  let currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.error("Task list is empty");
  }
  function renderTask() {
    var allTask = document.querySelector(".allTask");
    var sum = "";
    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        ` <div class="Task">
                        <h5>${elem.task}<span class="${elem.imp}">IMP</span></h5>
                        <button id=${idx}>Mark as Complete</button>
                    </div>`;
    });
    allTask.innerHTML = sum;
    var markCompletedbtn = document.querySelectorAll(".Task button");
    markCompletedbtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      Details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
    renderTask();
  });
}
Todolist();

function Dailyplanner() {
  var dayplanner = document.querySelector(".day-planner");
  var dayplanData = JSON.parse(localStorage.getItem("dayplandata")) || {};
  var hours = Array.from({ length: 18 }, function (_, idx) {
    return `${6 + idx}:00 -${7 + idx}:00`;
  });

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayplanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
                <p>${elem}</p>
                <input id=${idx} type="text" placeholder="...." value=${savedData}>
            </div>
             `;
  });
  dayplanner.innerHTML = wholeDaySum;

  var dayPlannerInputs = document.querySelectorAll(".day-planner-time input");
  dayPlannerInputs.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayplanData[elem.id] = elem.value;
      localStorage.setItem("dayplandata", JSON.stringify(dayplanData));
    });
  });
}
Dailyplanner();
function MotivationalQuote() {
  var MotivationQuote = document.querySelector(".Motivation-2 h3");
  var Motivationauthor = document.querySelector(".Motivation-3 h2");
  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    MotivationQuote.innerHTML = data.quote;
    Motivationauthor.innerHTML = data.author;
  }
  fetchQuote();
}
MotivationalQuote();

function PomodoroTimer() {
  let totalSecond = 1500;
  var timer = document.querySelector(".pomo-timer h1");
  var start = document.querySelector(".start-timer");
  var pause = document.querySelector(".pause-timer");
  var reset = document.querySelector(".reset-timer");
  var timerInterval = null;
  var isworksession = true;
  var session = document.querySelector(".session");
  function updateTimer() {
    let minutes = Math.floor(totalSecond / 60);
    let seconds = totalSecond % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isworksession) {
      timerInterval = setInterval(function () {
        if (totalSecond > 0) {
          totalSecond--;
          updateTimer();
        } else {
          isworksession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Break Session";
          totalSecond = 5 * 60;
        }
      }, 1000);
    } else {
      session.style.backgroundColor = "lightblue";

      clearInterval(timerInterval);
      timerInterval = setInterval(function () {
        if (totalSecond > 0) {
          totalSecond--;
          updateTimer();
        } else {
          isworksession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Working Session";
          totalSecond = 1500;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);
    totalSecond = 1500;
    updateTimer();
  }

  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);
}
PomodoroTimer();
var ApiKey = "ed15cb8a38b84639b7d143112263003";
var city = "khargone";
var header1h1 = document.querySelector(".header1 h1");
var header1h3 = document.querySelector(".header1 h3");
var temp = document.querySelector(".temp");
var press = document.querySelector(".press");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var header1h4 = document.querySelector(".header1 h4");
var mosam = document.querySelector(".rain");

async function weatherApi() {
  var response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}`,
  );
  var data = await response.json();
  console.log(data);
  temp.innerHTML = `${data.current.temp_c}°C`;
  press.innerHTML = `pressure: ${data.current.pressure_in} `;
  humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  wind.innerHTML = `Wind Speed: ${data.current.wind_kph} Km/h`;
  mosam.innerHTML = `${data.current.condition.text}`;
  header1h4.innerHTML = `${data.location.name}`;
}
weatherApi();

function updateTime() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "December",
  ];
  var Time = new Date();
  var day = days[Time.getDay()];
  var hours = Time.getHours();
  var minutes = Time.getMinutes();
  var seconds = Time.getSeconds();
  var date = Time.getDate();
  var month = monthNames[Time.getMonth()];
  var year = Time.getFullYear();

  header1h1.innerHTML = `${day}, ${hours}:${minutes} AM`;
  header1h3.innerHTML = `${date}  ${month} ${year}`;

  if (hours >= 12) {
    header1h1.innerHTML = `${day}, ${hours - 12}:${minutes}:${seconds} PM`;
  } else {
    header1h1.innerHTML = `${day}, ${hours}:${minutes}:${seconds} AM`;
  }
}
setInterval(() => {
  updateTime();
}, 1000);

function addGoal() {
  const input = document.getElementById("goal");
  const value = input.value.trim();
  if (value == "") return;
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `<p>${value}</p>
                    <button onclick="this.parentElement.remove()"><i class="ri-close-circle-fill"></i></button>`;
  document.querySelector(".notes-cont").appendChild(note);
  input.value = "";
}
