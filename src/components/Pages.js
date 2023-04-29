import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { conditionForClassList } from "../utils/utils.js";
const Pages = ({ element: Component, ...props }) => {
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const inputEmail = values["form__input_type_email"];
  const inputPassword = values["form__input_type_password"];
  const errorsInputEmail = errors["form__input_type_email"];
  const errorsInputPassword = errors["form__input_type_password"];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListEmail = conditionForClassList(errorsInputEmail);
  const conditionForClassListPassword =
    conditionForClassList(errorsInputPassword);
  // обработка отправки формы
  function handleSubmit(e) {
    e.preventDefault();
  }
  // условие для страницы авторизации
  const conditionForLogin = () => Component.name === "Login";
  // изменение данных при монтировании (авторизация/регистрация)
  useEffect(() => {
    resetForm();
    setValues({});
    if (conditionForLogin() === true) {
      props.setFormTitleValue("Вход");
      props.setFormButtonValue("Войти");
    } else {
      props.setFormTitleValue("Регистрация");
      props.setFormButtonValue("Зарегистрироваться");
      props.handleUnregisteredUser();
    }
  }, []);
  // общие данные страниц авторизации и регистрации
  const pageElements = () => {
    return (
      <form className="form" onSubmit={handleSubmit}>
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
            value={inputEmail || ""}
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
            value={inputPassword || ""}
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
          type="button"
          name="form-button"
          aria-label={`Кнопка действия &quot;${props.formButtonValue}&quot;`}
          className={`form__button ${
            !conditionForLogin() && "form__button_type_register"
          } ${
            isValid ? "indicator" : "form__button_disabled indicator_disabled"
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
