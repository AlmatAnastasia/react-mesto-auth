import infoTooltipOk from "../images/popup-info-tooltip-ok.svg";
import infoTooltipError from "../images/popup-info-tooltip-error.svg";
// InfoTooltip — компонент модального окна,
// который информирует пользователя об успешной (или не очень) регистрации
export default function InfoTooltip({ name, isValidPage, isOpen, onClose }) {
  const popupClassList = `popup popup_type_${name} ${isOpen && "popup_opened"}`;
  return (
    <div className={popupClassList}>
      <div className="popup__container">
        <form
          name={`popup-form_type_${name}`}
          className="popup__form"
          noValidate
        >
          <img
            className="popup__image-info-tooltip"
            src={
              isValidPage === "infoTooltipOk"
                ? infoTooltipOk
                : isValidPage === "infoTooltipError"
                ? infoTooltipError
                : ""
            }
            alt='Изображение "Информационная всплывающая подсказка"'
          />
          <h3 className="popup__heading popup__heading_type_info-tooltip">
            {isValidPage === "infoTooltipOk"
              ? "Вы успешно зарегистрировались!"
              : `Что-то пошло не так! Попробуйте ещё раз.`}
          </h3>
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
