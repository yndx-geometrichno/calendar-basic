import "./index.css";
import { formatMonthYear, changeMonth, resetDate } from "../utils/getDate.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationSettings } from "../utils/const.js";
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
import PopupWithEvent from "../components/PopupWithEvent.js";

let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const clearEvents = document.querySelector(".header__button_reset-calendar");

clearEvents.addEventListener("click", () => {
  localStorage.removeItem("events");
  clearCalendar();
  load();
  console.log("clear")
});

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
const popupAddEvent = document.querySelector(".popup__form-event");

function clearCalendar() {
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }
}

function load() {
  console.log("load")
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

  const twoDigitMonth = (month + 1).toString().padStart(2, "0");

  const paddingDays = weekdays.indexOf(dayString.split(", ")[0]);
  const afterDays = weekdays.length - 1 - weekdays.indexOf(lastDayString);

  for (let i = 1; i <= paddingDays + daysInMonth + afterDays; i++) {
    const daySquare = document.createElement("div");
    const eventName = document.createElement("div");
    const dayString = `${year}-${twoDigitMonth}-${(i - paddingDays)
      .toString()
      .padStart(2, "0")}`;

      console.log(dayString)

    if (i <= paddingDays) {
      daySquare.classList.add("calendar__prev-month");
      daySquare.innerText = daysInPrevMonth - paddingDays + i;
    } else if (i > paddingDays && i <= daysInMonth + paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.classList.add("calendar__this-month");
      const eventsForDay = events.filter((e) => e.date === dayString);
      if (eventsForDay.length > 0) {
        eventsForDay.forEach((element) => {
          const eventName = document.createElement("li");
          eventName.classList.add("day__event");
          eventName.innerText = element.eventName;
          daySquare.appendChild(eventName);
        });

        daySquare.appendChild(eventName);
      }
      daySquare.addEventListener("click", () => openEventsPopup(dayString));
    } else if (i > daysInMonth) {
      let newMonthDays = (daysInMonth - i + 1 + paddingDays) * -1;
      newMonthDays = newMonthDays + 1;
      daySquare.classList.add("calendar__next-month");
      daySquare.innerText = newMonthDays;
    }

    calendar.append(daySquare);
  }
}

load();

const popupAddEventOpened = new PopupWithForm(popupAddEventSelector, {
  submitCallback: (newValues, submitBtn) => {
    events.push(newValues);
    localStorage.setItem("events", JSON.stringify(events));
    changeSubmitBtnStatus(submitBtn, "Сохранение...");
    setTimeout(changeSubmitBtnStatus, 1000, submitBtn, "Сохранить");

    clearCalendar();
    load();
    popupAddEventOpened.close();
  },
});

addEventBtn.addEventListener("click", () => {
  popupAddEventOpened.open();
});
popupAddEventOpened.setEventListeners();

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

const validateEventForm = new FormValidator(validationSettings, popupAddEvent);

validateEventForm.enableValidation();

function changeSubmitBtnStatus(submitBtn, value) {
  submitBtn.value = value;
}

export const popupDayEvents = document.querySelector(".popup_type_day-events");
export const popupHeaderEvent = document.querySelector(".event-popup__header");
export const popupAboutEvent = document.querySelector(".event-popup__about");

const popupEventOpened = new PopupWithEvent(".popup_type_day-events");

popupEventOpened.setEventListeners();

function openEventsPopup(date) {
  const clicked = date;
  const eventsForDay = events.filter((e) => e.date === clicked);

  if (eventsForDay.length > 0) {
    popupEventOpened.open(eventsForDay, clicked);
  } else {
    console.log(clicked)
    alert("There is no events for that day")
  }
}
