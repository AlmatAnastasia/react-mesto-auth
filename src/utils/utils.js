export const dataApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61", // адрес сервера и идентификатор группы
  headers: {
    authorization: "e34a8857-3580-4e3d-82f5-9114588dd5f8", // личный токен
    "Content-Type": "application/json",
  },
};

export const conditionForClassList = (errors) =>
  errors !== undefined && errors !== "";
export const inputDescriptionUrl = "popup__input_type_description-url";
export const inputNameText = "popup__input_type_name-text";
export const inputDescriptionText = "popup__input_type_description-text";
