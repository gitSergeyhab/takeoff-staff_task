import { ThunkAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ReducerType } from '../store/store';

export type ContactType = {
  id: string,
  name: string,
  email: string,
  phone: string
}

export type UserType = {
  id: string,
  email: string,
  token: string,
}

export type ThunkActionResult<R=Promise<void>> = ThunkAction<R, ReducerType, AxiosInstance, Action>;
