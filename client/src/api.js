import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // La dirección de tu backend
  withCredentials: true // IMPORTANTE: Permite enviar/recibir cookies
});

export default api;