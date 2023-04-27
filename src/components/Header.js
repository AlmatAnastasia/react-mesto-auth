import headerLogo from "../images/header-logo.svg";

export default function Header() {
  return (
    // Блок 1 header
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt='Логотип сервиса "Место"'
      />
    </header>
  );
}