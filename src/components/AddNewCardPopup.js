import { useEffect } from "react";
import Popup from "./Popup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputNameTextSelector,
  inputDescriptionUrlSelector,
} from "../utils/utils.js";
export default function AddNewCardPopup({
  textButton,
  isOpen,
  onClose,
  onAddNewCard,
}) {
  // данные формы
  const name = "new-card";
  const title = "Новое место";
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const inputName = values[inputNameTextSelector];
  const inputDescription = values[inputDescriptionUrlSelector];
  const errorsInputName = errors[inputNameTextSelector];
  const errorsInputDescription = errors[inputDescriptionUrlSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListName = conditionForClassList(errorsInputName);
  const conditionForClassListDescription = conditionForClassList(
    errorsInputDescription
  );
  // очистка полей при монтировании
  useEffect(() => {
    resetForm();
    setValues({});
  }, [resetForm, setValues, isOpen]);
  // обработка отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onAddNewCard({
      name: inputName,
      link: inputDescription,
    });
  }
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form
        name={`popup-form_type_${name}`}
        className="popup__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <h3 className="popup__heading">{title}</h3>
        <fieldset className="popup__info">
          <div className="popup__cell">
            <input
              type="text"
              id="popup-new-card-name-text"
              name="popup__input_type_name-text"
              className={`popup__input popup__input_type_name-text ${
                conditionForClassListName && "popup__input_type_error"
              }`}
              placeholder="Название"
              minLength="2"
              maxLength="30"
              value={inputName || ""}
              onChange={handleChange}
              required
            />
            <span
              className={`popup-new-card-name-text-error ${
                conditionForClassListName && "popup__input-error"
              }`}
            >
              {errorsInputName}
            </span>
          </div>
          <div className="popup__cell">
            <input
              type="url"
              id="popup-new-card-description-url"
              name="popup__input_type_description-url"
              className={`popup__input popup__input_type_description-url ${
                conditionForClassListDescription && "popup__input_type_error"
              }`}
              placeholder="Ссылка на картинку"
              value={inputDescription || ""}
              onChange={handleChange}
              required
            />
            <span
              className={`popup-new-card-description-url-error ${
                conditionForClassListDescription && "popup__input-error"
              }`}
            >
              {errorsInputDescription}
            </span>
          </div>
        </fieldset>
        <button
          type="submit"
          name="submit"
          aria-label={`Кнопка отправки формы &quot;${textButton}&quot;`}
          className={`popup__submit ${
            isValid ? "indicator" : "popup__submit_disabled indicator_disabled"
          }`}
          disabled={isValid ? false : true}
        >
          {textButton}
        </button>
      </form>
    </Popup>
  );
}
