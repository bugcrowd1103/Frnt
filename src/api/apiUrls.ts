// src/api/apiUrls.ts

export const BASE_URL = 'http://127.0.0.1:3001/api';

export const API_URLS = {
  LOGIN: `${BASE_URL}/users/login`,
  REGISTER: `${BASE_URL}/users/register`,
   CURRENT_USER: `${BASE_URL}/users/me`,  // <-- add this
  LOGOUT: `${BASE_URL}/users/logout`,
  // Add more endpoints here as needed
};
