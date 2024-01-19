import {
  chosenMonth, currentDate
} from "../utils/const.js";


export function changeMonth(delta) {
  currentDate.setDate(1);
  currentDate.setMonth(currentDate.getMonth() + delta);

  // Если месяц стал меньше 0, значит, переключаемся с января на декабрь предыдущего года
  if (currentDate.getMonth() < 0) {
    currentDate.setMonth(11); // Декабрь
    currentDate.setFullYear(currentDate.getFullYear() - 1); // Уменьшаем год на 1
  }

  // Если месяц стал больше 11, значит, переключаемся с декабря на январь следующего года
  if (currentDate.getMonth() > 11) {
    currentDate.setMonth(0); // Январь
    currentDate.setFullYear(currentDate.getFullYear() + 1); // Увеличиваем год на 1
  }

  chosenMonth.textContent = formatMonthYear(currentDate);
  console.log(chosenMonth, currentDate)
}

export function resetDate() {
  let newDate = new Date();
  currentDate.setMonth(newDate.getMonth());
  currentDate.setFullYear(newDate.getFullYear());
  chosenMonth.textContent = formatMonthYear(currentDate);
}

export function formatMonthYear(date) {
  const months = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь"
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}
