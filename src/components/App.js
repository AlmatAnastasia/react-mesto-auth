import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithForm from "./PopupWithForm";
import AddNewCardPopup from "./AddNewCardPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // переменные состояния
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isPopupImageOpen: false,
    link: "",
    heading: "",
  });
  const [cardDelete, setcardDelete] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    about: "",
    avatar: "",
    isGetData: false,
  });
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  // открыть/закрыть попапы edit, new-card, avatar
  function handleEditPopupClick() {
    setIsEditPopupOpen(!isEditPopupOpen);
  }
  function handleNewCardPopupClick() {
    setIsNewCardPopupOpen(!isNewCardPopupOpen);
  }
  function handleUpdateAvatarPopupClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }
  // открыть/закрыть попап image
  function handleCardClick(data) {
    const { link, name } = data;
    setSelectedCard({ isPopupImageOpen: true, link: link, heading: name });
  }
  // отправка попапа delete
  function handlePopupDeleteSubmit(e) {
    e.preventDefault();
    deleteOldCard(cardDelete);
  }
  // удалить карточку
  function handleCardDelete(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    if (isDeletePopupOpen) {
      setIsRenderLoading(true);
    }
    setcardDelete(card);
  }
  // закрыть все попапы
  function closeAllPopups() {
    setIsEditPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsDeletePopupOpen(false);
  }
  // Взаимодействие с сервером
  // добавить информацию о пользователе с сервера
  useEffect(() => {
    // эффект при монтировании
    api
      .getProfileInfo()
      .then((info) => {
        const { name, about, avatar, _id } = info;
        // обновление стейт-переменной
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  }, []);
  // загрузить карточки с сервера
  useEffect(() => {
    // эффект при монтировании
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  }, []);
  // лайк/дизлайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    // отправить запрос в API и получить обновлённые данные карточки
    if (!isLiked) {
      api
        .updateAddStatusLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          // обработать ошибки
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    } else {
      api
        .updateDeleteStatusLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          // обработать ошибки
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    }
  }
  // удалить карточку
  function deleteOldCard(card) {
    setIsRenderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setIsDeletePopupOpen(!isDeletePopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  }
  // изменить собственную информацию (данные профиля) на сервере
  function handleUpdateUser({ name, about }) {
    setIsRenderLoading(true);
    api
      .editProfileInfo(name, about)
      .then((info) => {
        const { name, about, avatar, _id } = info;
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
        setIsEditPopupOpen(!isEditPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  }
  // добавить новую карточку на сервер
  function handleAddNewCard({ name, link }) {
    setIsRenderLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        // расширенная копия текущего массива cards
        setCards([newCard, ...cards]);
        setIsNewCardPopupOpen(!isNewCardPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  }
  // изменить собсвенную информацию (аватар пользователя)
  function handleUpdateAvatar({ avatar }) {
    setIsRenderLoading(true);
    api
      .editProfileAvatar(avatar)
      .then((info) => {
        const { name, about, avatar, _id } = info;
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
        setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditPopup={handleEditPopupClick}
          onNewCardPopup={handleNewCardPopupClick}
          onUpdateAvatarPopup={handleUpdateAvatarPopupClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          setCards={setCards}
        />

        <Footer />

        <EditProfilePopup
          textButton={isRenderLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isEditPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddNewCardPopup
          textButton={isRenderLoading ? "Создание..." : "Создать"}
          isOpen={isNewCardPopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddNewCard}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton={isRenderLoading ? "Удаление..." : "Да"}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlePopupDeleteSubmit}
          isValid={true}
        />

        <EditAvatarPopup
          textButton={isRenderLoading ? "Создание..." : "Создать"}
          isOpen={isUpdateAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          name="image"
          isOpen={selectedCard}
          onClose={closeAllPopups}
          heading={selectedCard.heading}
          link={selectedCard.link}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
