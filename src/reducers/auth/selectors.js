export const getNameIsAuth = (state) => state.auth.data && state.auth.data.fullName;

export const getIdIsAuth = (state) => state.auth.data && state.auth.data._id;

export const registeredUsers = (state) => state.auth.registeredUsers;
