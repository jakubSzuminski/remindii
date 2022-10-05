import { LOGOUT, START_LOADING, END_LOADING } from '../constants/actionTypes';
import Cookies from 'js-cookie';

export const login = () => {
    const uri = process.env.NODE_ENV === 'production' ? 'https://www.remindii.pl' : 'http://localhost:5000';
    window.open(uri + '/auth/google', '_self');
}

export const logout = () => async dispatch => {
    dispatch({ type: START_LOADING });

    try {
        Cookies.remove('token');
        dispatch({ type: LOGOUT });
    }
    catch(e) {
        console.log(e);
    }

    dispatch({ type: END_LOADING });
}

