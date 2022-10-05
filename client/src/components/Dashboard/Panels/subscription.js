import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActiveDot, InactiveDot } from '../dots';

import { manageBilling } from '../../../api';

const SubscriptionPanel = () => {
    const navigate = useNavigate();

    const { subscriptionType, subscriptionStatus } = useSelector(state => state.user);

    const manageSubscription = async () => {
        const { data } = await manageBilling();
        const { location } = data;

        window.open(
            location,
            "_self"
        )
    }

    const SubscriptionUI = () => {
        if(subscriptionType == 'not chosen') {
            return (
                <>
                <p className="mb-2">Nie wybrałeś jeszcze żadnego pakietu. Wiadomości do Twoich klientów nie wysyłają się!</p>
                <button onClick={() => navigate('/pricing')} className="button-cta">Wybierz subskrypcję teraz!</button>
                </>
            )
        } else {
            let subscriptionTypeCode = 'inny';

            switch(subscriptionType) {
                case '1':
                    subscriptionTypeCode = 'MAŁY';
                    break;
                case '2': 
                    subscriptionTypeCode = 'STANDARD';
                    break;
                case '3':
                    subscriptionTypeCode = 'GIGANT';
                    break;
            }

            return (
                <>
                <ul className="list-text-standard mb-2">
                    <li><span className="bold">Twój Plan:&nbsp;</span>{subscriptionTypeCode}</li>
                    <li>
                        <span className="bold">Status:&nbsp;</span>
                        {subscriptionStatus == 'active' && (
                            <div className="subscription-status">
                                <ActiveDot/>
                                aktywna
                            </div>
                        )}
                        {subscriptionStatus.startsWith('canceled') && (
                            <div className="subscription-status">
                                <InactiveDot/>
                                anulowana, ważna do {subscriptionStatus.split(';')[1]}
                            </div>
                        )}
                    </li>
                </ul>
            
                <button className="no-outline underline color-gray" onClick={manageSubscription}>Zarządzaj subskrypcją tutaj</button>
                </>
            )
        }
    }
    
    return (
        <section id="panel-subscription-info" className="mb-5">
            <h2 className="mb-3">Subskrypcja</h2>
            <SubscriptionUI/>
        </section>
    )
}

export default SubscriptionPanel;