export default function ImagePopup({ name, isOpen, onClose, heading, link }) {
  const popupClassList = `popup popup_type_${name} ${
    isOpen.isPopupImageOpen && "popup_opened"
  }`;
  return (
    <div className={popupClassList}>
      <div className="popup__container popup__container_preview">
        <img className="popup__image indicator" src={`${link}`} alt="Превью" />
        <h3 className="popup__heading popup__heading_preview">{heading}</h3>
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
