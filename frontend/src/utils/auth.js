import { authUrl } from "./baseUrl";

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${authUrl}${url}`, {
    method,
    headers: {
      'Content-type': 'application/json',
      ...!!token && { 'authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
}

export const authorize = (email, password) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
};

export const register = (email, password) => {
  return request({
    url: '/signup',
    data: { password: password, email: email }
  });
};

export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}