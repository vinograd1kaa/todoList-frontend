import { RootState } from '../index';

export const getNameIsAuth = (state: RootState) => state.auth.data && state.auth.data.fullName;

export const getIdIsAuth = (state: RootState) => state.auth.data && state.auth.data._id;

export const registeredUsers = (state: RootState) => state.auth.registeredUsers;
