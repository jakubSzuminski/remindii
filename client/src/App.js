import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import { getUserData } from './actions/user';

import Navigation from './components/Navigation/navigation';
import LandingPage from './components/LandingPage/landingPage';
import Footer from './components/Footer/footer';

import Pricing from './components/Pricing';
import PrivacyPolicy from './components/PrivacyPolicy/privacypolicy';

import Dashboard from './components/Dashboard';
import Log from './components/Dashboard/log';
import Instructions from './components/Instructions/instructions';
import Contact from './components/Contact/contact';
import Login from './components/Login/login';

import PaymentMessage from './components/Payment/paymentmessage';

import './styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import routes from './constants/routes';

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) dispatch(getUserData());
    }, []);

    const { logged } = useSelector(state => state.user);

    return (
        <Router>
            <header className="container-wide">
                <Link to={!logged ? routes.landing : routes.dashboard} className="logo">Remindii</Link>
                <Navigation/>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path={routes.dashboard} element={<Dashboard/>}/>
                    <Route path={routes.dashboard_log} element={<Log/>}/>
                    <Route path={routes.pricing} element={<Pricing/>}/>

                    <Route path={routes.contact} element={<Contact/>}/>
                    <Route path={routes.instructions} element={<Instructions/>}/>

                    <Route path={routes.payment_success} element={<PaymentMessage success={true}/>}/>
                    <Route path={routes.payment_cancel} element={<PaymentMessage success={false}/>}/>

                    <Route path={routes.privacy_policy} element={<PrivacyPolicy/>}/>

                    <Route path={routes.login} element={<Login/>}/>
                </Routes>
            </main>

            <Footer/>
        </Router>
    )
}