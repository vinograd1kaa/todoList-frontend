import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import history from './services/history';
import store from './store/configureStore';
import Projects from './containers/Projects';

import i18n from './i18n';
import theme from './theme';
import GlobalStyles from './globalStyles';
import 'typeface-roboto';
import 'typeface-source-sans-pro';

import './globalStyles/fontAwesome';
import Todo from './containers/TodoList/Todo';
import TodoSettings from './containers/TodoList/TodoSettings';
import FullTodo from './containers/TodoList/FullTodo/FullTodo';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyles />
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/todo" element={<Todo />} replace exact />
              <Route path="/todo/:id" element={<FullTodo />} />
              <Route path="/settings" element={<TodoSettings />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
