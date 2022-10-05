import { useSelector } from 'react-redux';
import products from '../../constants/products';

import Loading from '../Loading/loading';

import { login } from '../../actions/auth';
import { createCheckoutSession } from '../../api';

export default function Pricing() {
    const { logged, loading } = useSelector(state => state.user);
    
    const subscribe = async (code) => {
        const response = await createCheckoutSession(code);
        window.location.replace(response.data);
    }

    if(loading) return (
        <div className="loading-container">
            <Loading/>
        </div>
    )
        
    return (
        <section id="pricing-page">
            <div className="container">
                {logged ? (
                    <h1 className="mb-3 center">Twój ostatni krok</h1>
                ) : ( 
                    <h1 className="mb-3 center">Pakiety</h1>
                )}

                <div className="pricing-plans mb-5">

                    <div className="pricing-plan">
                        <h2>{ products.LITE.name }</h2>
                        <div className="price">
                            <p>{ products.LITE.price }</p>
                            <span>PLN/miesiąc</span>
                        </div>
                        <p className="plan-limit">do { products.LITE.limit } smsów miesięcznie</p>
                        
                        {logged && <button onClick={() => subscribe(1)}>Wybierz</button>}
                    </div>

                    <div className="pricing-plan pricing-plan-special">
                        <h2>{ products.STANDARD.name }</h2>
                        <div className="price">
                            <p>{ products.STANDARD.price }</p>
                            <span>PLN/miesiąc</span>
                        </div>
                        <p className="plan-limit">do { products.STANDARD.limit } smsów miesięcznie</p>
                        {logged && <button onClick={() => subscribe(2)}>Wybierz</button>}
                    </div>

                    <div className="pricing-plan">
                        <h2>{ products.GIANT.name }</h2>
                        <div className="price">
                            <p>{ products.GIANT.price }</p>
                            <span>PLN/miesiąc</span>
                        </div>
                        <p className="plan-limit">do { products.GIANT.limit } smsów miesięcznie</p>
                        {logged && <button onClick={() => subscribe(3)}>Wybierz</button>}
                    </div>

                </div>

                {!logged && (
                    <div className="center">
                        <p>Aby wybrać pakiet, </p>
                        <button onClick={login} className="color-primary bold">zaloguj się przez Google!</button>
                    </div>
                )}

            </div>
        </section>
    )
}