import axios from 'axios';
import { getAuthToken } from 'utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

// 獲取所有文章
export const getAllPosts = () => {
  return axios
    .get(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
    .then((res) => res.data);
};

// 獲取單篇文章
export const getPostInfo = (id) => {
  return axios
    .get(`${BASE_URL}/posts/${id}?_expand=user`)
    .then((res) => res.data);
};

// 刪除文章
export const deletePost = (id) => {
  return axios.delete(`${BASE_URL}/posts/${id}`).then((res) => res.data);
};

// 編輯文章
export const editPost = (id, title, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => {
    return res.json();
  });
};

// 註冊
export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 登入
export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身分驗證
export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

// 新增文章
export const addPost = (title, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};
