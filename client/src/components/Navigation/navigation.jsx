import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Link as OnpageLink } from 'react-scroll';

import { logout } from '../../actions/auth';

import Routes from '../../constants/routes';

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { logged } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const openMobileMenu = () => {
        document.getElementById('mobile-nav-overlay').style.width = "100%";
    }

    const closeMobileMenu = () => {
        document.getElementById('mobile-nav-overlay').style.width = "0";
    }

    return (
    <>
    <nav id="main-nav">
        {logged ? (
        <>
            <Link to={Routes.dashboard} className={window.location.pathname === Routes.dashboard ? 'active' : ''}>Twój Panel</Link>
            <Link to={Routes.instructions} className={window.location.pathname === Routes.instructions ? 'active' : ''}>Instrukcje</Link>
            <Link to={Routes.contact} className={window.location.pathname === Routes.contact ? 'active' : ''}>Kontakt</Link>
            <button onClick={handleLogout}>Wyloguj</button>
        </>
        ) : (
        <>
            {!(window.location.pathname === Routes.pricing || window.location.pathname === Routes.login) && (
                <OnpageLink to="howitworks" activeClass="active" spy={true} smooth={true} offset={-70} href="">Jak to działa?</OnpageLink>
            )}

            <Link to={Routes.pricing}>Cennik</Link>
            
            {!(window.location.pathname === Routes.pricing || window.location.pathname === Routes.login) && (
                <OnpageLink to="contact" activeClass="active" spy={true} smooth={true} offset={-70} href="">Kontakt</OnpageLink>
            )}

            <button onClick={ () => navigate(Routes.login) } className="nav-cta">Zaloguj się przez Google</button>
        </>
        )}
    </nav>
    
    <nav id="mobile-nav">
        <ion-icon name="menu-outline" onClick={openMobileMenu}></ion-icon>
        
        {logged ? (
        <div id="mobile-nav-overlay">
            <div className="div-center">
                <ion-icon name="close-outline" onClick={closeMobileMenu}></ion-icon>
            </div>

            <ul id="mobile-nav-overlay-content">
                <Link to={Routes.dashboard} className={window.location.pathname === Routes.dashboard ? 'active' : ''} onClick={closeMobileMenu}>Twój Panel</Link>
                <Link to={Routes.instructions} className={window.location.pathname === Routes.instructions ? 'active' : ''} onClick={closeMobileMenu}>Instrukcje</Link>
                <Link to={Routes.contact} className={window.location.pathname === Routes.contact ? 'active' : ''} onClick={closeMobileMenu}>Kontakt</Link>
                <button onClick={handleLogout}>Wyloguj</button>
            </ul>
        </div>
        ) : (
        <div id="mobile-nav-overlay">
            <div className="div-center">
                <ion-icon name="close-outline" onClick={closeMobileMenu}></ion-icon>
            </div>
            
            <ul id="mobile-nav-overlay-content">
                {!(window.location.pathname === Routes.pricing || window.location.pathname === Routes.login) &&
                <li>
                    <OnpageLink to="howitworks" activeClass="active" spy={true} smooth={true} offset={-70} href="" onClick={closeMobileMenu}>Jak to działa?</OnpageLink>
                </li>
                }

                {(window.location.pathname === Routes.pricing || window.location.pathname === Routes.login) && 
                <li>
                    <Link to={Routes.landing} onClick={closeMobileMenu}>Strona główna</Link>
                </li>
                }

                <li>
                    <Link to={Routes.pricing} onClick={closeMobileMenu}>Cennik</Link>
                </li>


                {!(window.location.pathname === Routes.pricing) &&
                <li>
                    <OnpageLink to="contact" activeClass="active" spy={true} smooth={true} offset={-70} href="" onClick={closeMobileMenu}>Kontakt</OnpageLink>
                </li>
                }
                
                <li>
                    <button onClick={ () => { closeMobileMenu(); navigate(Routes.login); }  } className="mobile-nav-cta">Zaloguj się przez Google</button>
                </li>
            </ul>
        </div>  
        )}
        
    </nav>
    </>
  );
};

export default Navigation;