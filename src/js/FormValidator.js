export default class FormValidator {
    /*
     *@ param {HTMLel} formElem argument is the form
     *
     */
    constructor(formElem) {
        /*
         * inputsElems - selects all inputs in the form
         * submitButton - select a button type
         */
        this.formElem = formElem;
        this.inputElems = this.formElem.querySelectorAll('input');
        this.submitButton = this.formElem.querySelector('button');


        this.setSubmitButtonState();
    }

    /*
     * shows error message if inputs are not valid// hides if inputs are valid
     *
     */
    checkInputValidity(inputElem) {
        const errorElem = this.formElem.querySelector(`#error-${inputElem.id}`);
        const errorMessages = {
            valueMissing: 'Это обязательное поле',
            tooShort: 'Должно быть от 2 до 30 символов',
            typeMismatch: 'Здесь должна быть ссылка'
        }

        if (inputElem.validity.valueMissing) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.valueMissing;

        } else if (inputElem.validity.tooShort || inputElem.validity.tooLong) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.tooShort;

        } else if (inputElem.validity.typeMismatch) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.typeMismatch;
        } else {
            errorElem.classList.add('error-message__hidden');
            inputElem.setCustomValidity('');
        }
    }

    resetForm() {
        this.formElem.reset();
        //
        this.inputElems.forEach(inputElem => {
            const errorElem = this.formElem.querySelector(`#error-${inputElem.id}`);
            errorElem.textContent = '';
            errorElem.classList.add('error-message__hidden');
        });
        this.setSubmitButtonState();
    }


    setSubmitButtonState() {
        if (this.formElem.checkValidity()) {
            this.submitButton.classList.remove('popup__button-disabled');
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.classList.add('popup__button-disabled');
            this.submitButton.setAttribute('disabled', true);
        }
    }

    validateAllForm() {
        this.inputElems.forEach(inputElem => this.checkInputValidity(inputElem));
        this.setSubmitButtonState();
    }

    setEventListeners() {

        this.inputElems.forEach(inputElem => {

          inputElem.addEventListener('input', (event) => {
              const inputElem = event.target;
              this.checkInputValidity(inputElem);
          });

        });

        this.formElem.addEventListener('input', this.setSubmitButtonState.bind(this));

      }

}

/*
const editValidationForm = new FormValidator(formEdit, errorMessages);
editValidationForm.setEventListeners();

const addImageValidation = new FormValidator(form, errorMessages);
addImageValidation.setEventListeners();

*/