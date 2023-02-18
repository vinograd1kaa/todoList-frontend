import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import history from './services/history';
import store from './store/configureStore';

import i18n from './i18n';
import theme from './theme';
import GlobalStyles from './globalStyles';
import 'typeface-roboto';
import 'typeface-source-sans-pro';

import './globalStyles/fontAwesome';
import './globalStyles/font-family.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyles />
            <App />
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
