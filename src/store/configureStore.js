import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'reducers';

let middleware;
let store;

/* global __DEV__ */
if (__DEV__) {
  const excludedActions = [
    // 'persist/REHYDRATE',
  ];
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => excludedActions.indexOf(action.type) < 0,
  });
  middleware = applyMiddleware(logger);
} else {
  middleware = applyMiddleware();
}

export const getStore = () => store;

export default (data = {}) => {
  store = createStore(reducers, data, middleware);
  return store;
};
