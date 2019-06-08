import { createStore, combineReducers } from 'redux'
import sidebarReducer from './sidebar-reducer';
import userReducer from './user-reducer';


export default function configureStore(preloadedState = {}) {
    
    let combined = combineReducers({
        sidebar: sidebarReducer,
        user: userReducer
    })
    
    return createStore(combined, preloadedState);

}