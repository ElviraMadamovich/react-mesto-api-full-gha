import { authUrl } from "./baseUrl";

const request = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(`${authUrl}/${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export const authorize = (email, password) => {
  return request("signin", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
};

export const register = (email, password) => {
  return request("signup", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
};

export const checkToken = (token) => {
  return request("users/me", "GET", null, token);
};