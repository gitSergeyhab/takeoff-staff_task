import { createReducer } from '@reduxjs/toolkit';
import { addSearchAction } from '../actions';

type InitialStore = {
  search: string
}

const initialStore: InitialStore = {
  search: ''
};

export const searchReducer = createReducer(initialStore, (builder) => {
  builder.addCase(addSearchAction, (state, action) => {state.search = action.payload;});
});
