import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import {
  CreateTodoTaskFields,
  TodoItems,
  TodoReducerState,
  TodoTypeItem,
  TodoUpdateTaskType,
} from './types';

export const fetchUserPosts = createAsyncThunk('auth/fetchUserPosts', async (id: string | null) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

export const fetchCreate = createAsyncThunk(
  'auth/fetchCreate',
  async (fields: CreateTodoTaskFields) => {
    await axios.post('/posts', fields);
  },
);

export const fetchDelete = createAsyncThunk('auth/fetchDelete', async (id: string) => {
  await axios.delete(`/posts/${id}`);
});

export const fetchHandleUpdate = createAsyncThunk(
  'auth/fetchHandleUpdate',
  async (fields: TodoUpdateTaskType) => {
    await axios.put(`/posts/${fields.id}`, fields.params);
  },
);

const initialState: TodoReducerState = {
  posts: {
    items: {},
    status: 'loading',
  },
  itemIdToMove: null,
  itemIdCalendarOpen: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeIsCalendarOpen: (state: TodoReducerState, action: { payload: string }) => {
      if (action.payload === state.itemIdCalendarOpen) {
        state.itemIdCalendarOpen = null;
      }
      state.itemIdCalendarOpen = action.payload;
    },
    changeIdItemToMove: (state: TodoReducerState, action: { payload: string }) => {
      if (action.payload === state.itemIdToMove) {
        state.itemIdToMove = null;
        return;
      }
      state.itemIdToMove = action.payload;
    },
    clearPostsLogout: (state: TodoReducerState) => {
      state.posts.items = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state: TodoReducerState) => {
      state.posts.items = {};
      state.posts.status = 'loading';
    });
    builder.addCase(fetchUserPosts.fulfilled, (state: TodoReducerState, action) => {
      state.posts.items = action.payload.reduce(
        (acc: TodoItems, obj: TodoTypeItem) => ((acc[obj._id!] = obj), acc),
        {},
      );
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchUserPosts.rejected, (state: TodoReducerState) => {
      state.posts.items = {};
      state.posts.status = 'error';
    });
  },
});

export const todo = todoSlice.reducer;

export const {
  changeIsCalendarOpen,
  changeIdItemToMove,
  clearPostsLogout,
}: any = todoSlice.actions;
