export class FormValidator {
  constructor(validationSettings, formElement) {
    this._formElement = formElement;
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(`.${this._inputSelector}`)
    );
    this._buttonElement = this._formElement.querySelector(
      `.${this._submitButtonSelector}`
    );
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleSubmitButton();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", () => {
      this._disableSubmitButton();
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError = (inputElement) => {
    const errorElement = inputElement
      .closest("label")
      .querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = inputElement
      .closest("label")
      .querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  resetInputErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", false);
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", true);
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    this._setEventListeners();

    return this._formElement;
  }
}
