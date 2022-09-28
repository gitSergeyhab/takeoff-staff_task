import { createReducer } from '@reduxjs/toolkit';
import { UserType } from '../../types/types';
import { setUserAction, removeUserAction } from '../actions';

type InitialState = {
  user: UserType | null
}

const initialState: InitialState = {
  user: null
};


export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserAction, (state, action) => { state.user = action.payload; })
    .addCase(removeUserAction, (state) => { state.user = null; });

});
