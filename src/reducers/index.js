import { combineReducers } from 'redux'

import { alertReducer } from './alertReducer';
import { authenticationReducer } from './authenticationReducer';
import {loadingReducer} from './loadingReducer'
const rootReducer = combineReducers({
    alertReducer,
    authenticationReducer,
    loadingReducer
})

export default rootReducer;