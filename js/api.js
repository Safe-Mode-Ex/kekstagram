const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const createApi = (route, errorText, method = HttpMethod.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then(({ok, json}) => {
      if (!ok) {
        throw new Error();
      }
      return json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => createApi(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => createApi(Route.SEND_DATA, ErrorText.SEND_DATA, HttpMethod.POST, body);

export {getData, sendData};
