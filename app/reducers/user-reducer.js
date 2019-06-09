import UserActions from "./user-actions";

const initial = {
    username: null,
    loggedIn: false,
    loggingIn: false
}

export default function sidebarReducer(state = initial, action) {  
    switch (action.type) {
        case UserActions.LOGIN_SUCCESS:
            return {
                ...initial,
                ...action.payload,
                loggedIn: true,
                password: undefined
            };
        case UserActions.LOGIN_FAILURE:
            return {
                ...initial,
                ...action.payload,
                password: undefined
            } 
        case UserActions.REQUEST_LOGIN:
            return {
                ...initial,      
                ...action.payload,
                loggingIn: true,
                password: undefined
            }
        default:
            return state;
    }
}