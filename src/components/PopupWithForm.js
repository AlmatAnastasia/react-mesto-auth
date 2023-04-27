import usePopupClose from "../hooks/usePopupClose";
export default function PopupWithForm({
  name,
  title,
  textButton,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
  const popupClassList = `popup popup_type_${name} ${isOpen && "popup_opened"}`;
  // закрыть попап при нажатии на overlay или клавишей Esc
  usePopupClose(isOpen, onClose);
  return (
    <div className={popupClassList}>
      <div className="popup__container">
        <form
          name={`popup-form_type_${name}`}
          className="popup__form"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__heading">{title}</h3>
          {children}
          <button
            type="submit"
            name="submit"
            aria-label={`Кнопка отправки формы &quot;${textButton}&quot;`}
            className={`popup__submit ${
              isValid
                ? "indicator"
                : "popup__submit_disabled indicator_disabled"
            }`}
            disabled={isValid ? false : true}
          >
            {textButton}
          </button>
        </form>
        <button
          type="button"
          name="close-button"
          aria-label='Кнопка "Закрыть"'
          className="popup__close-button indicator"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
