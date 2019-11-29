export function loadingReducer(state = {}, action) {
    switch (action.type) {
        case 'IS_LOADING':
            return { ...state, 
                is_loading: action.message
             }
        default:
            return state
    }
}