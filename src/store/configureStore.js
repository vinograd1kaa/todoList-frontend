import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';
import { dateButtons } from '../utils/todoSettings';

const localStorageButton = localStorage.getItem('activeButton') || '1';
const findSortBy = dateButtons[localStorageButton].sortBy;

const preloadedState = {
  todoSettings: {
    dateSettings: { activeButton: localStorageButton, sortBy: findSortBy },
    sortButtons: dateButtons,
  },
};

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: 'New app',
        })
      : compose;

  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default initStore();
