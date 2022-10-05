import * as types from '../constants/actionTypes';

const initialState = {  logged: false, name: '', email: '', message: '', subscriptionStatus: '', subscriptionType: '', log: [], loading: false,
messageLoading: false, messageInfo: '' };

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.START_LOADING: return { ...state, loading: true }
        case types.END_LOADING: return { ...state, loading: false }

        case types.MESSAGE_START_LOADING: return { ...state, messageLoading: true };
        case types.MESSAGE_END_LOADING: return { ...state, messageLoading: false, messageInfo: action.payload.data };

        case types.LOGOUT: return initialState;
        
        case types.GET_DATA: 
            return {
                ...state,
                logged: true,
                name: action.payload.name,
                email: action.payload.email,
                message: action.payload.message,
                subscriptionStatus: action.payload.subscriptionStatus,
                subscriptionType: action.payload.subscriptionType,
                log: action.payload.log
            }
        
        case types.GET_USER_LOG: return { ...state, log: action.payload }
        
        case types.GET_DATA_FAILED: return initialState;

        default: return state;
    }
}

export default reducer;