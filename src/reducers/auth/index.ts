import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthReducerState, LoginValues, RegisterValues } from './types';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: LoginValues) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params: RegisterValues) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
  },
);

export const fetchAuthMeInfo = createAsyncThunk('auth/fetchAuthMeInfo', async (params: any) => {
  const { data } = await axios.get('/auth/me', params);
  return data;
});

export const fetchGetAll = createAsyncThunk('auth/getAll', async () => {
  const { data } = await axios.get('/auth/getAll');
  return data;
});

const initialState: AuthReducerState = {
  registeredUsers: [],
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearDataLogout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state: AuthReducerState) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuth.fulfilled, (state: AuthReducerState, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuth.rejected, (state: AuthReducerState) => {
      state.data = null;
      state.status = 'error';
    });

    builder.addCase(fetchAuthMeInfo.pending, (state: AuthReducerState) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuthMeInfo.fulfilled, (state: AuthReducerState, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuthMeInfo.rejected, (state: AuthReducerState) => {
      state.data = null;
      state.status = 'error';
    });

    builder.addCase(fetchGetAll.pending, (state: AuthReducerState) => {
      state.registeredUsers = [];
      state.status = 'loading';
    });
    builder.addCase(fetchGetAll.fulfilled, (state: AuthReducerState, action) => {
      state.registeredUsers = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchGetAll.rejected, (state: AuthReducerState) => {
      state.data = null;
      state.status = 'error';
    });
  },
});

export const { clearDataLogout } = authSlice.actions;

export const auth = authSlice.reducer;
