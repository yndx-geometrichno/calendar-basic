const addEventBtn = document.querySelector(".header__button_add-event");
const popupAddEventSelector = ".popup_type_add-event";
const chosenMonth = document.querySelector(".control__date");
const currentDate = new Date();
const choosePrevMonthBtn = document.querySelector(
  ".control__button_type_prev-month"
);
const chooseNextMonthBtn = document.querySelector(
  ".control__button_type_next-month"
);
const resetDateToTodayBtn = document.querySelector(".control__button_type_today");

export {
  addEventBtn,
  popupAddEventSelector,
  chosenMonth,
  currentDate,
  chooseNextMonthBtn,
  choosePrevMonthBtn,
  resetDateToTodayBtn,
};
