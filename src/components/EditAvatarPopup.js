import { useEffect } from "react";
import Popup from "./Popup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputDescriptionUrlSelector,
} from "../utils/utils.js";
export default function EditAvatarPopup({
  textButton,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  // данные формы
  const name = "update-avatar";
  const title = "Обновить аватар";
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  // наличие текста ошибки для каждого из полей
  const conditionForClassListDescription = conditionForClassList(
    errors[inputDescriptionUrlSelector]
  );
  // очистка полей при монтировании
  useEffect(() => {
    resetForm();
    setValues({});
  }, [resetForm, setValues, isOpen]);
  // обработка отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: values[inputDescriptionUrlSelector],
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
              type="url"
              id="popup-update-avatar-description-url"
              name="popup__input_type_description-url"
              className={`popup__input popup__input_type_description-url ${
                conditionForClassListDescription && "popup__input_type_error"
              }`}
              placeholder="Ссылка на новое изображение аватара"
              value={values[inputDescriptionUrlSelector] || ""}
              onChange={handleChange}
              required
            />
            <span
              className={`popup-update-avatar-description-url-error ${
                conditionForClassListDescription && "popup__input-error"
              }`}
            >
              {errors[inputDescriptionUrlSelector]}
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
