import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';


const createAPI = () => {
  const api = axios.create({baseURL: BASE_URL});
  return api;
};


export const api = createAPI();
