export default function Register({ children }) {
  return (
    <div className="register">
      {children}
      <div className="register__signin">
        <p className="register__text">Уже зарегистрированы?</p>
        <a href="/sign-in" className="register__login-link link">
          Войти
        </a>
      </div>
    </div>
  );
}
