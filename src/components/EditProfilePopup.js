import { useContext, useEffect } from "react";
import Popup from "./Popup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputNameTextSelector,
  inputDescriptionTextSelector,
} from "../utils/utils.js";
export default function EditProfilePopup({
  textButton,
  isOpen,
  onClose,
  onUpdateUser,
}) {
  // данные формы
  const name = "edit";
  const title = "Редактировать профиль";
  // данные текущего пользователя
  const currentUser = useContext(CurrentUserContext);
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const inputName = values[inputNameTextSelector];
  const inputDescription = values[inputDescriptionTextSelector];
  const errorsInputName = errors[inputNameTextSelector];
  const errorsInputDescription = errors[inputDescriptionTextSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListName = conditionForClassList(errorsInputName);
  const conditionForClassListDescription = conditionForClassList(
    errorsInputDescription
  );
  // добавление данных  текущего пользователя в поля при монтировании
  useEffect(() => {
    resetForm();
    setValues({
      [inputNameTextSelector]: currentUser.name,
      [inputDescriptionTextSelector]: currentUser.about,
    });
  }, [resetForm, setValues, currentUser, isOpen]);
  // обработка отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: inputName,
      about: inputDescription,
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
              id="popup-edit-name-text"
              name="popup__input_type_name-text"
              className={`popup__input popup__input_type_name-text ${
                conditionForClassListName && "popup__input_type_error"
              }`}
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              value={inputName || ""}
              onChange={handleChange}
              required
            />
            <span
              className={`popup-edit-name-text-error ${
                conditionForClassListName && "popup__input-error"
              }`}
            >
              {errorsInputName}
            </span>
          </div>
          <div className="popup__cell">
            <input
              type="text"
              id="popup-edit-description-text"
              name="popup__input_type_description-text"
              className={`popup__input popup__input_type_description-text ${
                conditionForClassListDescription && "popup__input_type_error"
              }`}
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              value={inputDescription || ""}
              onChange={handleChange}
              required
            />
            <span
              className={`popup-edit-description-text-error ${
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
