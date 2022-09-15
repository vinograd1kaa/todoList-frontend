import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import history from './services/history';
import store from './store/configureStore';
import Projects from './containers/Projects';
import Todo from './containers/Todo';

import i18n from './i18n';
import theme from './theme';
import GlobalStyles from './globalStyles';
import 'typeface-roboto';
import 'typeface-source-sans-pro';

import './globalStyles/fontAwesome';
import Forwarding from './containers/Forwarding/Forwarding';

// Todo: use 'rem' for font-size, to change font-size for theme.screens.sm devices across the whole App by changing body font-size
// Todo: finalize theme variables
// Todo: add propTypes
// Replace loader with pretty one

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyles />
            <Switch>
              <Route path="/projects" component={Projects} />
              <Route path="/todo" component={Todo} />
              <Forwarding fromURL="/" toURL="/todo" />
            </Switch>
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
