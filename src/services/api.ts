import axios from 'axios';

// PRODUCTION
const baseURL = 'https://apimonitora.herokuapp.com/api';

// DEVELOPTMENT
// const baseURL = 'http://192.168.10.4:8001/api';

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});
