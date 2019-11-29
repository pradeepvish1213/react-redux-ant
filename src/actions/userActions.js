import { userConstants } from '../constants';
import { alertActions } from './alertActions';
import { history, webService } from '../utils';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(form_data) {
    return (dispatch) => {
        let apiEndpoint = 'login';
        dispatch(alertActions.is_loading(true));
        webService.post(apiEndpoint, form_data).then((response) => { 
            if (response.data.status === 200) {
                dispatch(success(response.data.data));
                history.push('/home');
                dispatch(alertActions.success('Login successful'));
            } else {
                dispatch(failure(response.data.message));
                dispatch(alertActions.error(response.data.message.message));
            }
            dispatch(alertActions.is_loading(false));
        });
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(form_data) {
    return (dispatch) => {
        let apiEndpoint = 'logout';
        webService.post(apiEndpoint, form_data).then((response) => {
            if (response.data.status === 200) {
                localStorage.removeItem('user');
                history.push('/');
            } else {
                dispatch(failure(response.data.message));
                dispatch(alertActions.error(response.data.message));
            }
        });
        return { type: userConstants.LOGOUT };
    }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
 
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
 
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
 
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}