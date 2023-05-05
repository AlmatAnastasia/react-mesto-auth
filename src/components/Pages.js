import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputEmailSelector,
  inputPasswordSelector,
} from "../utils/utils.js";
// общий компонент для авторизации и регистрации пользователя
const Pages = ({ element: Component, ...props }) => {
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const inputEmail = values[inputEmailSelector];
  const inputPassword = values[inputPasswordSelector];
  const errorsInputEmail = errors[inputEmailSelector];
  const errorsInputPassword = errors[inputPasswordSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListEmail = conditionForClassList(errorsInputEmail);
  const conditionForClassListPassword =
    conditionForClassList(errorsInputPassword);
  // изменение данных при монтировании (авторизация/регистрация)
  useEffect(() => {
    props.setResetForm({ resetForm });
    resetForm();
    setValues({});
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    props.setFormTitleValue("Вход");
  }, []);
  // общие данные страниц авторизации и регистрации
  const pageElements = () => {
    return (
      <form
        className="form"
        onSubmit={props.handleSubmit(inputEmail, inputPassword)}
      >
        <h1 className="form__title">{props.formTitleValue}</h1>
        <div className="form__ceil">
          <input
            type="email"
            id="form-email"
            name="form__input_type_email"
            className={`form__input form__input_type_email ${
              conditionForClassListEmail && "form__input_type_error"
            }`}
            placeholder="Email"
            value={
              localStorage.userEmail ? localStorage.userEmail : inputEmail || ""
            }
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className={`form-email-text-error ${
              conditionForClassListEmail && "form__input-error"
            }`}
          >
            {errorsInputEmail}
          </span>
        </div>
        <div className="form__ceil">
          <input
            type="password"
            id="form__password"
            name="form__input_type_password"
            className={`form__input form__input_type_password ${
              conditionForClassListPassword && "form__input_type_error"
            }`}
            placeholder="Пароль"
            minLength="8"
            maxLength="16"
            value={
              localStorage.userPassword
                ? localStorage.userPassword
                : inputPassword || ""
            }
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <span
            className={`form-password-text-error ${
              conditionForClassListPassword && "form__input-error"
            }`}
          >
            {errorsInputPassword}
          </span>
        </div>
        <button
          type="submit"
          name="form-button-submit"
          aria-label={`Кнопка действия &quot;${props.formButtonValue}&quot;`}
          className={`form__button-submit ${props.buttonSubmitSelector} ${
            isValid
              ? "indicator"
              : "form__button-submit_disabled indicator_disabled"
          }`}
          disabled={isValid ? false : true}
        >
          {props.formButtonValue}
        </button>
      </form>
    );
  };
  return <Component>{pageElements()}</Component>;
};

export default Pages;
