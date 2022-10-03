import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { api } from '../service/api';
import { contactsApi } from './contacts-api/contacts-api';
import { searchReducer } from './search-reducer/search-reducer';
import { userReducer } from './user-reducer/user-reducer';

export const enum ReducerName {
  Search = 'Search',
  User = 'User',
}

export const reducer = combineReducers({
  [ReducerName.Search]: searchReducer,
  [ReducerName.User]: userReducer,

  [contactsApi.reducerPath]: contactsApi.reducer,

});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}).concat(contactsApi.middleware)
});

export type ReducerType = ReturnType<typeof reducer>;

export const getUser = (state: ReducerType) => state[ReducerName.User].user;
export const getSearchValue = (state: ReducerType) => state[ReducerName.Search].search;
