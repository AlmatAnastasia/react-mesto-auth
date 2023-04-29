import headerLogo from "../images/header-logo.svg";

export default function Header({ textButton, isUnauthorizedUser }) {
  return (
    // Блок 1 header
    <header className={`header ${isUnauthorizedUser && "header_type_pages"}`}>
      <img
        className={`header__logo ${
          isUnauthorizedUser && "header__logo_type_pages"
        }`}
        src={headerLogo}
        alt='Логотип сервиса "Место"'
      />
      <button
        type="button"
        name="app-login-button"
        aria-label={`Кнопка входа в приложение &quot;${textButton}&quot;`}
        className="header__app-login-button indicator"
      >
        <a
          href={textButton === "Войти" ? "/sign-in" : "/sign-up"}
          className="header__login-link link"
        >
          {textButton}
        </a>
      </button>
    </header>
  );
}
