import { createAction } from '@reduxjs/toolkit';
import { UserType } from '../types/types';


const enum Action {
  AddSearch = 'search/addSearch',
  SetUser = 'setUser/setUser',
  RemoveUser = 'user/removeUser',

}

export const addSearchAction = createAction(Action.AddSearch, (search: string) => ({payload: search}) );
export const setUserAction = createAction(Action.SetUser, (user: UserType | null) => ({payload: user}) );
export const removeUserAction = createAction(Action.RemoveUser);


