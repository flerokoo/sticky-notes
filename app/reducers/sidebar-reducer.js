import SidebarActions from "./sidebar-actions";


export default function sidebarReducer(state = {open: true}, action) {    
    switch (action.type) {
        case SidebarActions.OPEN:
            return {open: true};
        case SidebarActions.CLOSE:
            return {open: false};
        case SidebarActions.TOGGLE:
            return {open: !state.open};
        default:
            return state;
    }
}