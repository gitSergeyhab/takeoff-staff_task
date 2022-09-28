import { AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ThunkActionResult } from '../types/types';
import { addUserToStorage } from '../utils/storage-utils';
import { setUserAction } from './actions';

type DataType = {email: string, password: string}

const serErrorMessage = (cb: (message: string) => void, err: Error | AxiosError) => {
  if(axios.isAxiosError(err)){
    cb(err.response?.data.message);
  } else {
    cb('something is wrong...');
  }
};

const postRegistration = ({email, password} : DataType, cb: () => void, cbError: () => void): ThunkActionResult =>
  async(_dispatch, _getState, api) => {
    try {
      await api.post('/users/registration', {email, password});
      // console.log('registration ok');
      cb();
    } catch (err) {
      // const error = err as Error | AxiosError;
      serErrorMessage(cbError, err as Error | AxiosError);
      // const error = err as Error | AxiosError;
      // if(axios.isAxiosError(error)){
      //   console.log(error.response?.data.message);
      // } else {
      //   console.log('something is wrong...');
      // }
    }
  };


const postLogin = ({email, password} : DataType, cb: () => void, cbError: React.Dispatch<React.SetStateAction<string>>): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const result = await api.post('/users/login', {email, password});
      const {token, id} = result.data;
      addUserToStorage({id, email, token});
      dispatch(setUserAction({id, email, token}));
      cb();
    } catch (err) {
      serErrorMessage(cbError, err as Error | AxiosError);
    }
  };

export const registration = ( postRegistration as unknown ) as ({email, password} : DataType, cb: () => void, cbError: React.Dispatch<React.SetStateAction<string>>) => AnyAction;
export const login = ( postLogin as unknown ) as ({email, password} : DataType, redirect: () => void, cbError: React.Dispatch<React.SetStateAction<string>>) => AnyAction;

