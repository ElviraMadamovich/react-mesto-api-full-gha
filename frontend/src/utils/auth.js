import { authUrl } from "./baseUrl";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${authUrl}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res))
}

export const authorize = (email, password) => {
  return fetch(`${authUrl}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res))
}

export const checkToken = (token) => {
  return fetch(`${authUrl}/users/me`, {
    method: "GET",
    headers: {
      ...this._headers,
      "Authorization": `Bearer ${token}`
    },
  })
    .then(res => checkResponse(res))
}