import { createStore, combineReducers } from 'redux'
import sidebarReducer from './sidebar-reducer';


export default function configureStore(preloadedState = {}) {
    
    let combined = combineReducers({
        sidebar: sidebarReducer
    })
    
    return createStore(combined, preloadedState);

}