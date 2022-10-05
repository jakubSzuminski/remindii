import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SubscriptionPanel from './Panels/subscription';
import UserInfoPanel from './Panels/userinfo';
import MessagePanel from './Panels/message';
import LogPanel from './Panels/logpanel';

import Loading from '../Loading/loading';

import Cookies from 'js-cookie';
import { getUserData } from '../../actions/user';

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { logged, loading } = useSelector(state => state.user);
    const [startedLoading, setStartedLoading] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) dispatch(getUserData());
    }, []);

    useEffect(() => {
        setStartedLoading(true);
    }, []);

    useEffect(() => { 
        if(!startedLoading) return;
        if(!logged && !loading) navigate('/');
    }, [startedLoading, logged, loading]);

    if(loading) return (
        <div className="loading-container">
            <Loading/>
        </div>
    )  

    //TODO: add phone number
    return (
        <section id="panel" className="container grid grid-3">
            <div>
            <SubscriptionPanel/>
            <UserInfoPanel/>                 
            </div>

            <MessagePanel/>
            <LogPanel/>
        </section>
    )
}

