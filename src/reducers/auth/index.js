import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMeInfo = createAsyncThunk('auth/fetchAuthMeInfo', async (params) => {
  const { data } = await axios.get('/auth/me', params);
  return data;
});

export const fetchGetAll = createAsyncThunk('auth/getAll', async () => {
  const { data } = await axios.get('/auth/getAll');
  return data;
});

const initialState = {
  registeredUsers: [],
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    [fetchGetAll.pending]: (state) => {
      state.registeredUsers = [];
      state.status = 'loading';
    },
    [fetchGetAll.fulfilled]: (state, action) => {
      state.registeredUsers = action.payload;
      state.status = 'loaded';
    },
    [fetchGetAll.rejected]: (state) => {
      state.data = [];
      state.status = 'error';
    },
  },
});

export const selectIsAuth = (state) => state && Boolean(state.auth.data);
export const getNameIsAuth = (state) => state.auth.data && state.auth.data.fullName;
export const getIdIsAuth = (state) => state.auth.data && state.auth.data._id;
export const registeredUsers = (state) => state.auth.registeredUsers;

export const auth = authSlice.reducer;

export const { logout } = authSlice.actions;
