import axios from 'axios';

export const apiUrl = `${process.env.REACT_APP_API_URL}`;

export const api = axios.create({
  baseURL: apiUrl,
});
