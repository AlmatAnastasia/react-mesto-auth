import { useEffect } from "react";

export default function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return; // остановить действие эффекта, если попап закрыт

    // закрыть попап при нажатии на кнопку overlay
    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closePopup();
      }
    };

    // закрыть попап клавишей Esc
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    //  удалить обработчики в 'clean-up'- функции
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };

    // выполнять только при открытии (isOpen)
  }, [isOpen, closePopup]);
}
