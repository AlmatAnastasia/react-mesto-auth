# react-mesto-auth
# Проект Mesto на Реакте с авторизацией и регистрацией

---

**_Содержание файла README.md_**

<p>
<a href="#description">Описание</a>
<br>
<a href="#figma">Ссылка на макет в Figma</a>
<br>
<a href="#demo">Демонстрация</a>
<br>
<a href="#file_structure">Файловая структура</a>
<br>
<a href="#technologies">Использованные технологии</a>
<br>
<a href="#functionality">Функциональность</a>
</p>

<div id="description"></div>
<h2>Описание</h2>
<p>Данный проект реализован и запущен с помощью Create React App и представляет собой сервис Mesto на Реакте с авторизацией и регистрацией - React-mesto-auth: интерактивную страницу, отображающую карточки с фотографиями мест. Данные корточек получены с помощью Api запросов на сервер Яндекс.Практикума. Данная версия является копией реализованного сайта на JavaScript.<br>
В каталоге проекта его можно запустить командой 'npm start react-mesto-auth'.</p>

<div id="figma"></div>
<h2>Ссылка на макет в Figma</h2> 
<p><a href="https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1">Макет 1</a> - страницы авторизации и регистрации пользователя с мобильными версиями.</p>

<div id="demo"></div>
<h2>Демонстрация</h2>
<h3>Ссылка на сайт <a href="https://almatanastasia.github.io/mesto-react/">тут</a> !</h3>
<img src="./src/images/Demo_index.png" alt="Демо страницы index.html" width="900">

<div id="file_structure"></div>
<h2>Файловая структура</h2>
<pre>
.
├── public             # HTML<br>
├── src                CSS, JS-файлы, шрифты и изображения<br>
├── .gitignore         # Файл для игнорирования/предотвращения передачи файлов<br>
├── .nojekyll          # Пустой файл для публикации на GitHub Pages<br>
├── package-lock.json  # Файл блокировки, содержащий информацию о зависимостях/пакетах с их точными номерами версий<br>
├── package.json       # Файл управления версиями, используемый для установки нескольких пакетов в проекте<br>
├── README.md          # Файл документации проекта<br>
</pre>
<h2>Файловая структура директории public</h2>
<pre>
.
└── index.html      # Главная страница сервиса
</pre>
<h2>Файловая структура директории src</h2>
<pre>
.
├── blocks          # Файлы стилей блоков<br>
├── components      # Файлы компонентов<br>
├── contexts        # Файлы с объектами контекста<br>
├── hooks           # Файлы с кастомными хуками<br>
├── images          # Файлы изображений<br>
├── pages           # Файлы стилей страниц<br>
├── utils           # Файлы утилитарных модулей (отдельные функции и константы)<br>
├── vendor          # Файлы сторонних библиотек<br>
├── index.css       # Файл стилей<br>
└── index.js        # Основной JavaScript файл, выполняющий развёртывание React-приложения
</pre>
<h2>Файловая структура директории vendor</h2>
<pre>
.
├── fonts           # Файлы шрифтов<br>
├── normalize.css   # CSS-файл, обеспечивающий для HTML-элементов лучшую кроссбраузерность в стилях по умолчанию<br>
</pre>

<div id="technologies"></div>
<h2>Использованные технологии</h2>
<p>
⬥ JSX, Create React App, React Hooks<br>
⬥ Работа с API (метод fetch, формат JSON, методы HTTP)<br>
⬥ Метод HTTP (GET, POST, PUT, PATCH, DELETE)<br>
⬥ Хуки (useState, useEffect, useRef, useContext)<br>
⬥ Навигация - React Router (Routes, Route, useNavigate, Navigate)<br>
⬥ LocalStorage<br>
</p>

<div id="functionality"></div>
<h2>Функциональность</h2>
<p>✶ Информация о пользователе (данные получены с сервера)</p>
<p>✶ Карточки мест (данные получены с сервера)</p>
<p>✶ Пять формы</p>
<p>Форма редактирования профиля</p>
<p>Форма добавления новой карточки</p>
<p>Форма просмотра фотографий</p>
<p>Форма обновления аватара пользователя</p>
<p>Форма подтверждения (удалить фотографию)</p>
<p>Форма с информацией о регистрации (успешно или нет)</p>
<p>✶ Добавление карточки</p>
<p>✶ Удаление карточки</p>
<p>✶ Лайк карточки</p>
<p>✶ Плавное открытие и закрытие попапов</p>
<p>✶ Лайв-валидация («Живая» валидация)</p>
</p>Валидация формы «Редактировать профиль»</p>
</p>Валидация формы «Новое место»</p>
</p>Валидация формы «Обновить аватар»</p>
<p>✶ Четыре состояния кнопки отправки формы: обычное, при наведении, disabled и ожидания ответа от сервера</p>
<p>✶ Закрытие попапа кликом на оверлей</p>
<p>✶ Закрытие попапа нажатием на Esc</p>
<p>✶ Навигация по страницам:</p>
<p>1. /signin — авторизация пользователя</p>
<p>2. /signup — регистрация пользователя</p>
<p>3. / — основная функциональность приложения</p>
<p>✶ Регистрация и авторизация пользователя</p>
