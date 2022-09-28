import { UserType } from '../types/types';

const USER_STORAGE_KEY = 'user-key';

export const addUserToStorage = (user: UserType) => {
  const value = JSON.stringify(user);
  localStorage.setItem(USER_STORAGE_KEY, value);
};

export const getUserFromStorage = (): UserType | null => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};


export const removeUserFromStorage = () => localStorage.removeItem(USER_STORAGE_KEY);

