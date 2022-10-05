import Hero from './Hero/hero';
import Offer from './Offer/offer';
import How from './How/how'
import CTA from './CTA/cta';
import Contact from './Contact/contact';
import Details from './Details/details';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

export default function LandingPage() {
    const navigate = useNavigate();
    const { logged } = useSelector(state => state.user);

    useEffect(() => {
        if(logged) navigate(routes.dashboard);
    }, [logged]);
    
    return (
        <>
        <Hero/>
        <Offer/>
        <How/>
        <CTA/>
        <Contact/>
        <Details/>
        </>
    )
}