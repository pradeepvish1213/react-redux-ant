import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear,
    is_loading
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function is_loading(message) {
    return { type: 'IS_LOADING', message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}