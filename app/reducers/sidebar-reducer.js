import SidebarActions from "./sidebar-actions";


export default function sidebarReducer(state = true, action) {    
    switch (action.type) {
        case SidebarActions.OPEN:
            return true;
        case SidebarActions.CLOSE:
            return false;
        case SidebarActions.TOGGLE:
            return !state;
        default:
            return state;
    }
}