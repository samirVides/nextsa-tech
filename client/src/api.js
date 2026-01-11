import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nextsatech.com', // La dirección de tu backend
  withCredentials: true
});

export default api;