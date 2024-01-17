import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this._submitBtn = this._popup.querySelector(".popup__save-btn");
    this._inputLlist = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputLlist.forEach((input) => {
      inputValues[input.name] = input.value.trim();
    });
    return inputValues;
  }

  setEventListeners() {
    //обработчик клика иконке закрытия
    super.setEventListeners();
    //обработчик сабмита форм
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const newValues = this._getInputValues();
      this._submitCallback(newValues, this._submitBtn);
    });
  }

  close() {
    //закрываем форму
    super.close();
    //сбрасываем поля формы
    this._form.reset();
  }
}
