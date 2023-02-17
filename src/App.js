import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { TodoList, TodoSettings, FullTodo, Auth, Register, Login, Projections } from './containers';
import { fetchAuthMeInfo } from './reducers/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMeInfo());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/projects" element={<Projections />} />
        <Route path="/todo" element={<TodoList />} replace exact />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/:email" element={<Login />} />
        <Route path="/todo/:id" element={<FullTodo />} />
        <Route path="/settings" element={<TodoSettings />} />
      </Routes>
    </>
  );
};

export default App;
