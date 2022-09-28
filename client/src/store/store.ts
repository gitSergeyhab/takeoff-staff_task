import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { api } from '../service/api';
import { searchReducer } from './search-reducer/search-reducer';
import { userReducer } from './user-reducer/user-reducer';

export const enum ReducerName {
  Search = 'Search',
  User = 'User'
}

export const reducer = combineReducers({
  [ReducerName.Search]: searchReducer,
  [ReducerName.User]: userReducer

});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}})
});

export type ReducerType = ReturnType<typeof reducer>;
