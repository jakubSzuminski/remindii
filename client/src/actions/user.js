import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import * as api from '../api';
import { logout } from './auth';

import { GET_DATA, GET_DATA_FAILED, GET_USER_LOG, 
        UPDATE_USER_MESSAGE, 
        START_LOADING, END_LOADING,
        MESSAGE_START_LOADING, MESSAGE_END_LOADING,

} from '../constants/actionTypes';


export const getUserData = () => async dispatch => {
    dispatch({ type: START_LOADING });
    
    try {
        const { data } = await api.getUserData();
        Cookies.set('token', data);

        const decoded = jwt_decode(Cookies.get('token'));
        console.log(decoded);
        dispatch({
            type: GET_DATA,
            payload: decoded
        });

        dispatch({ type: END_LOADING });
        return;
    }
    catch(e) {
        console.log(e);
    }
    
    logout();
    dispatch({ type: GET_DATA_FAILED });
    dispatch({ type: END_LOADING });
}

export const getUserLog = () => async dispatch => {
    dispatch({ type: START_LOADING });

    try {
        const { data } = await api.getUserLog();
        dispatch({ type: GET_USER_LOG, payload: data });
    }
    catch(e) {
        console.log(e);
    }

    dispatch({ type: END_LOADING });
}

export const updateUserMessage = newMessage => async dispatch => {
    dispatch({ type: MESSAGE_START_LOADING });
    
    try {
        await api.updateUserMessage(newMessage);
        dispatch(getUserData());
    }
    catch(e) {
        console.log(e);
    }

    dispatch({ type: MESSAGE_END_LOADING, payload: 'baba' });
}
