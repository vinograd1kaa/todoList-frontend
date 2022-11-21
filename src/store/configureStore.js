import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers/index';
import rootSaga from '../sagas';
import { dateButtons } from '../utils/todoSettings';
import { fetchTodoWorker } from '../sagas/todo';

const localStorageButton = localStorage.getItem('activeButton') || '1';
const findSortBy = dateButtons[localStorageButton].sortBy;

const preloadedState = {
  todoSettings: {
    dateSettings: { activeButton: localStorageButton, sortBy: findSortBy },
    dateSortButtons: dateButtons,
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
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(fetchTodoWorker);

  return store;
};

export default initStore();
