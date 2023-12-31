class Api {
  constructor(url) {
    this._url = url;
  }

  _setAuthorization() {
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    };
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._setAuthorization(),
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._setAuthorization(),
    })
      .then(this._checkResponse);
  }

  updateDetails(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._setAuthorization(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._setAuthorization(),
      body: JSON.stringify(data),
    })
      .then(res => this._checkResponse(res));
  }

  deleteUserCard(cardId) {
    return fetch(`${this._url}/cards/${cardId} `, {
      method: "DELETE",
      headers: this._setAuthorization(),
    })
      .then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._setAuthorization(),
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._setAuthorization(),
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._setAuthorization(),
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(res => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api(
  'https://api.elviram.students.nomoreparties.sbs'
);