import { AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Message, ServerRoute } from '../const';
import { ThunkActionResult } from '../types/types';
import { addUserToStorage, removeUserFromStorage } from '../utils/storage-utils';
import { setUserAction } from './actions';


type DataType = {email: string, password: string}

const serErrorMessage = (cb: (message: string) => void, err: Error | AxiosError) => {
  if(axios.isAxiosError(err)){
    const message = err.response?.data.message;
    cb(message);
    toast.error(message);
  } else {
    cb(Message.DefaultError);
  }
};

const postRegistration = ({email, password} : DataType, cb: () => void, cbError: () => void): ThunkActionResult =>
  async(_dispatch, _getState, api) => {
    try {
      await api.post(ServerRoute.Registration, {email, password});
      toast.success(Message.SignUpSuccess);
      cb();
    } catch (err) {
      serErrorMessage(cbError, err as Error | AxiosError);
    }
  };


const postLogin = ({email, password} : DataType, cb: () => void, cbError: React.Dispatch<React.SetStateAction<string>>): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const result = await api.post(ServerRoute.Login, {email, password});
      const {token, id} = result.data;
      addUserToStorage({id, email, token});
      dispatch(setUserAction({id, email, token}));
      toast.success(Message.AuthSuccess);
      cb();
    } catch (err) {
      serErrorMessage(cbError, err as Error | AxiosError);
    }
  };


const getCheckAuth = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<boolean>(ServerRoute.Auth);
      if (!data) {
        dispatch(setUserAction(null));
        removeUserFromStorage();
        toast.error(Message.AuthError);

      }
    } catch {
      dispatch(setUserAction(null));
      removeUserFromStorage();
      toast.error(Message.AuthError);
    }
  };


export const registration = ( postRegistration as unknown ) as ({email, password} : DataType, cb: () => void, cbError: React.Dispatch<React.SetStateAction<string>>) => AnyAction;
export const login = ( postLogin as unknown ) as ({email, password} : DataType, redirect: () => void, cbError: React.Dispatch<React.SetStateAction<string>>) => AnyAction;
export const checkAuth = ( getCheckAuth as unknown ) as () => AnyAction;
