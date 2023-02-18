export type UserType = {
  email: string;
  fullName: string;
  passwordHash: string;
  token: string;
  __v: number;
  _id: string;
};

export interface AuthReducerState {
  registeredUsers: UserType[];
  data: null | UserType;
  status: string;
}

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  email: string;
  password: string;
  fullName: string;
};
