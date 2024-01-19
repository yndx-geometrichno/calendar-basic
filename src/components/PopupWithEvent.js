import Popup from "./Popup.js";
import {
  popupDayEvents,
  popupHeaderEvent,
  popupAboutEvent,
} from "../pages/index.js";

export default class PopupWithEvent extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._eventsPopupSelector = ".events-popup";
  }

  open(eventsForDay, date) {
    super.open();
    console.log(date)
    popupHeaderEvent.textContent = date;

    eventsForDay.forEach((element) => {
      const popup = document.querySelector(this._eventsPopupSelector);
      const eventItem = document.createElement("li");
      const eventHeader = document.createElement("h2");
      const eventAbout = document.createElement("p");

      eventItem.classList.add("event__item");
      eventHeader.classList.add("event__header");
      eventAbout.classList.add("event__about");
      eventHeader.innerText = element.eventName;
      eventAbout.innerText = element.about;
      popup.appendChild(eventItem).appendChild(eventHeader);
      eventItem.appendChild(eventAbout)
    });
  }
}
