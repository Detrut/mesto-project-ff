const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: '992f9cc6-3260-4694-ba37-99a48c1c9530',
    'Content-Type': 'application/json'
  }
}

function responseIsOk (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res =>
      responseIsOk(res)
    )
}

export const getUserData = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const getUserId = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res =>
    responseIsOk(res)
  )
  .then(data => {
    return data._id
  })
}

export const  postNewCard = (namePlace, placeUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: namePlace.value,
      link: placeUrl.value
    })
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const changeUserInfo = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const changeUserAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: avatarUrl.value
    })
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res =>
    responseIsOk(res)
  )
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res =>
    responseIsOk(res)
  )
}