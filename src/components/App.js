import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Popup from "./Popup";
import AddNewCardPopup from "./AddNewCardPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Pages from "./Pages";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRouteElement";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { register, authorize, checkToken } from "../utils/apiAuth";

function App() {
  // переменные состояния
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
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
  const [loggedIn, setLoggedIn] = useState(false); // статус пользователя
  const [textButtonHeader, setTextButtonHeader] = useState("");
  const [isValidPage, setIsValidPage] = useState("");
  const [formTitleValue, setFormTitleValue] = useState("");
  const [resetForm, setResetForm] = useState({});
  const navigate = useNavigate();
  // изменить статус пользователя (авторизация)
  function handleLogin() {
    setLoggedIn(true);
  }
  // проверка наличия токена и его валидности
  const handleTokenCheck = () => {
    /* проверить, существует ли токен в хранилище браузера*/
    if (localStorage.getItem("jwt")) {
      // присвоить токен переменной jwt
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            // перенаправить на страницу /
            setTextButtonHeader("Выход");
            navigate("/", { replace: true });
          }
        })
        .catch((error) => console.log(`${error}. Запрос не выполнен!`)); // вывести ошибку в консоль
    }
  };
  // открыть/закрыть попапы edit, new-card, avatar, info-tooltip
  function handleEditPopupClick() {
    setIsEditPopupOpen(!isEditPopupOpen);
  }
  function handleNewCardPopupClick() {
    setIsNewCardPopupOpen(!isNewCardPopupOpen);
  }
  function handleUpdateAvatarPopupClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }
  function handleInfoTooltipPopupClick() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
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
  // переадресовать пользователя на страницу /sign-up
  function onRegister() {
    resetForm.resetForm();
    setTextButtonHeader("Войти");
    setFormTitleValue("Регистрация");
    navigate("/sign-up", { replace: true });
  }
  // переадресовать пользователя на страницу /
  function onLogin() {
    resetForm.resetForm();
    if (loggedIn) {
      setTextButtonHeader("Выход");
      navigate("/", { replace: true });
    } else {
      setTextButtonHeader("Регистрация");
      setFormTitleValue("Вход");
      navigate("/sign-in", { replace: true });
    }
  }
  // удалить токен из localStorage
  // переадресовать пользователя на страницу /sign-in
  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    setTextButtonHeader("Регистрация");
    navigate("/sign-in", { replace: true });
  }
  // обработка отправки формы формы страницы Register
  // регистрация пользователя
  const handleSignUpSubmit = (inputEmail, inputPassword) => {
    return (e) => {
      e.preventDefault();
      // сохранить password и email в localStorage
      localStorage.setItem("userPassword", inputPassword);
      localStorage.setItem("userEmail", inputEmail);
      setIsRenderLoading(true);
      register(inputEmail, inputPassword)
        .then((res) => {
          if (res === 400) {
            handleInfoTooltipPopupClick();
            setIsValidPage("infoTooltipError");
          } else {
            handleInfoTooltipPopupClick();
            setIsValidPage("infoTooltipOk");
            onLogin();
          }
        })
        .catch((error) => console.log(`${error}. Запрос не выполнен!`)) // вывести ошибку в консоль
        .finally(() => {
          setIsRenderLoading(false);
        });
    };
  };

  // обработка отправки формы формы страницы Login
  // авторизация пользователя
  // проверка валидности токена
  const handleSignInSubmit = (inputEmail, inputPassword) => {
    return (e) => {
      e.preventDefault();
      // сохранить email в localStorage и удалить password
      localStorage.removeItem("userPassword");
      localStorage.setItem("userEmail", inputEmail);
      setIsRenderLoading(true);
      authorize(inputEmail, inputPassword)
        .then((res) => {
          // сохранить токен в localStorage
          localStorage.setItem("jwt", res.token);
          handleLogin();
          // navigate(0);
          onLogin();
        })
        .then(() => checkToken(localStorage.getItem("jwt")))
        .then((res) => {
          localStorage.setItem("userEmail", res.data.email);
        })
        .catch((error) => console.log(`${error}. Запрос не выполнен!`)) // вывести ошибку в консоль
        .finally(() => {
          setIsRenderLoading(false);
        });
    };
  };
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
    setIsInfoTooltipPopupOpen(false);
  }
  // Взаимодействие с сервером
  // добавить информацию о пользователе с сервера
  useEffect(() => {
    // эффект при монтировании
    setTextButtonHeader("Регистрация");
    // проверка наличия токена и его валидности
    handleTokenCheck();
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
        <Header
          textButton={textButtonHeader}
          loggedIn={loggedIn}
          onLogin={onLogin}
          onRegister={onRegister}
          signOut={signOut}
          onClose={closeAllPopups}
        />

        <Routes>
          {/* / — любой URL, кроме /signup и /signin защищены авторизацией*/}
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                path="/"
                onEditPopup={handleEditPopupClick}
                onNewCardPopup={handleNewCardPopupClick}
                onUpdateAvatarPopup={handleUpdateAvatarPopupClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                setCards={setCards}
              />
            }
          />
          {/* /sign-up — регистрация пользователя */}
          <Route
            path="/sign-up"
            element={
              <Pages
                element={Register}
                formTitleValue={formTitleValue}
                setFormTitleValue={setFormTitleValue}
                formButtonValue={
                  isRenderLoading ? "Регистрация..." : "Зарегистрироваться"
                }
                buttonSubmitSelector={"form__button-submit_type_register"}
                handleSubmit={handleSignUpSubmit}
                setResetForm={setResetForm}
              />
            }
          />
          {/* /sign-in — авторизация пользователя */}
          <Route
            path="/sign-in"
            element={
              <Pages
                element={Login}
                formTitleValue={formTitleValue}
                setFormTitleValue={setFormTitleValue}
                formButtonValue={isRenderLoading ? "Вход..." : "Войти"}
                buttonSubmitSelector={""}
                handleSubmit={handleSignInSubmit}
                setResetForm={setResetForm}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        {loggedIn && <Footer />}

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

        <Popup
          isOpen={isDeletePopupOpen}
          name="delete"
          onClose={closeAllPopups}
        >
          <form
            name={"popup-form_type_delete"}
            className="popup__form"
            onSubmit={handlePopupDeleteSubmit}
            noValidate
          >
            <h3 className="popup__heading">Вы уверены?</h3>
            <button
              type="submit"
              name="submit"
              aria-label={`Кнопка отправки формы &quot;${
                isRenderLoading ? "Удаление..." : "Да"
              }&quot;`}
              className="popup__submit indicator"
              disabled={false}
            >
              {isRenderLoading ? "Удаление..." : "Да"}
            </button>
          </form>
        </Popup>

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

        <InfoTooltip
          name="info-tooltip"
          isValidPage={isValidPage}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;