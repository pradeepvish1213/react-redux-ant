import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger();

export default function configureStore(initialState = {}) {
    const middlewares = [thunkMiddleware, loggerMiddleware]
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
    const enhancers = [
        applyMiddleware(...middlewares),
        composeEnhancers
    ]
    const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers))
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            /* eslint-disable global-require */
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }
    return store
}