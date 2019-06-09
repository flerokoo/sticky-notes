import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import sidebarReducer from './sidebar-reducer';
import userReducer from './user-reducer';
import rootSaga from '../sagas/root-saga';


export default function configureStore(preloadedState = {}) {
    
    let combined = combineReducers({
        sidebar: sidebarReducer,
        user: userReducer
    })

    let sagaMiddleware = createSagaMiddleware();
    let enhancers = [ sagaMiddleware ]
    
    let store = createStore(combined, preloadedState, applyMiddleware(...enhancers));

    sagaMiddleware.run(rootSaga)

    return store;
}