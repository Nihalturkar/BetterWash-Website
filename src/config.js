const isProduction = window.location.hostname !== 'localhost';

export const API_URL = isProduction
  ? '/api'
  : 'http://localhost:3000/api';

export const BASE_URL = isProduction
  ? ''
  : 'http://localhost:3000';
