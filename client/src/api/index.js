import axios from 'axios';
import Cookies from 'js-cookie';

const apiURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

axios.interceptors.request.use(req => {
    const token = Cookies.get('token');
    if(token) req.headers['Authorization'] = `Bearer ${token}`;
    return req;
});

export const login = () => axios.get('/auth/google');

export const getUserData = () => axios.get(apiURL + '/user/get-user-data');
export const getUserLog = () => axios.get(apiURL + '/user/get-user-log', { withCredentials: true });
export const updateUserMessage = (newMessage) => axios.post(apiURL + '/user/update-user-message', { newMessage });

export const createCheckoutSession = (code) => axios.post(apiURL + '/payment/create-checkout-session', { code });
export const manageBilling = () => axios.post(apiURL + '/payment/create-portal-session');
