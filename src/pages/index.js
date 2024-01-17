import "./index.css";
import { formatMonthYear, changeMonth, resetDate } from "../utils/getDate.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  addEventBtn,
  popupAddEventSelector,
  chosenMonth,
  currentDate,
  chooseNextMonthBtn,
  choosePrevMonthBtn,
  resetDateToTodayBtn,
} from "../utils/const.js";

let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
const weekdays = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
];

const calendar = document.querySelector(".calendar");

function clearCalendar() {
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }
}

function load() {
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const lastDay = new Date(year, month + 1, 0);

  const dayString = firstDay.toLocaleDateString("ru-ru", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const lastDayString = lastDay.toLocaleDateString("ru-ru", {
    weekday: "long",
  });

  const paddingDays = weekdays.indexOf(dayString.split(", ")[0]);
  const afterDays = weekdays.length - 1 - weekdays.indexOf(lastDayString);

  for (let i = 1; i <= paddingDays + daysInMonth + afterDays; i++) {
    const daySquare = document.createElement("div");
    if (i <= paddingDays) {
      daySquare.classList.add("calendar__prev-month");
      daySquare.innerText = daysInPrevMonth - paddingDays + i;
    } else if (i > paddingDays && i <= daysInMonth + paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.classList.add("calendar__this-month");
      daySquare.addEventListener("click", () => console.log("click"));
    } else if (i > daysInMonth) {
      let newMonthDays = (daysInMonth - i + 1 + paddingDays) * -1;
      newMonthDays = newMonthDays + 1;
      console.log(afterDays, i, paddingDays, daysInMonth);
      daySquare.classList.add("calendar__next-month");
      daySquare.innerText = newMonthDays;
    }

    calendar.append(daySquare);
  }
}

load();

const popupAddEventOpened = new PopupWithForm(popupAddEventSelector, {
  submitCallback: (newValues, submitBtn) => {
    changeSubmitBtnStatus(submitBtn, "Сохранение...");
    setTimeout(changeSubmitBtnStatus, 1000, submitBtn, "Сохранить");
    popupProfileOpened.close();
  },
});

addEventBtn.addEventListener("click", () => {
  popupAddEventOpened.open();
  popupAddEventOpened.setEventListeners();
});

// Инициализация значений
chosenMonth.textContent = formatMonthYear(currentDate);

choosePrevMonthBtn.addEventListener("click", () => {
  changeMonth(-1); // Передаем -1 для переключения на предыдущий месяц
  clearCalendar();
  load();
});

chooseNextMonthBtn.addEventListener("click", () => {
  changeMonth(1); // Передаем 1 для переключения на следующий месяц
  clearCalendar();
  load();
});

resetDateToTodayBtn.addEventListener("click", () => {
  resetDate();
  clearCalendar();
  load();
});
