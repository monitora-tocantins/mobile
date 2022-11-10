import axios from 'axios';

// PRODUCTION
// const baseURL = 'https://apimonitora.herokuapp.com';

// DEVELOPTMENT
const baseURL = 'http://192.168.10.105:3333/api';

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});
