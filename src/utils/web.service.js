import axios from 'axios';
import {baseApiUrl} from './../constants';
import {authHeader} from './auth-header';

export const webService = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint) {
    return axios
        .get(baseApiUrl + apiEndpoint, authHeader())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return ErrorRespond(err);
        });
}

function post(apiEndpoint, payload) {
    return axios
        .post(baseApiUrl + apiEndpoint, payload, authHeader())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return ErrorRespond(err);
        });
}

function put(apiEndpoint, payload) {
    return axios
        .put(baseApiUrl + apiEndpoint, payload, authHeader())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return ErrorRespond(err);
        });
}

function deleteDetail(apiEndpoint) {
    return axios
        .delete(baseApiUrl + apiEndpoint, authHeader())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return ErrorRespond(err);
        });
}

function ErrorRespond(error) {
    return {data: {type: 'ALERT_ERROR', message: error, status: 'NET_ERROR'}};
}