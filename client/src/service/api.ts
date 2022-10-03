import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AUTH_TOKEN, Message, StatusCode } from '../const';
import { removeUserAction } from '../store/actions';
import { store } from '../store/store';
import { getUserFromStorage, removeUserFromStorage } from '../utils/storage-utils';


const BASE_URL = 'http://localhost:5000/api/';


const createAPI = (onAuthError: () => void) => {
  const api = axios.create({baseURL: BASE_URL});
  api.interceptors.request.use(
    (config) => {
      const user = getUserFromStorage();

      if (user) {
        config.headers[AUTH_TOKEN] = user.token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      const {response} = error;
      if (response?.status === StatusCode.NotAuth) {
        onAuthError();
      } else {
        toast.error(Message.DefaultError);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const onAuthError = () => {
  removeUserFromStorage();
  store.dispatch(removeUserAction());
  toast.error(Message.AuthError);
};

export const api = createAPI(onAuthError);
