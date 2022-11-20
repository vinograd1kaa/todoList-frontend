import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import { Redirect } from 'react-router';
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
            <Switch>
              <Route path="/projects" component={Projects} />
              <Route path="/todo" component={Todo} exact />
              <Route path="/todo/:id" component={FullTodo} />
              <Route path="/settings" component={TodoSettings} />
            </Switch>
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
