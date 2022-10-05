import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentMessage = (props) => {
    const navigate = useNavigate();

    const [time, setTime] = useState(8);

    useEffect(() => {
        setTimeout(() => {
            setTime(time-1);
        }, 1000);

        if(time <= 0) navigate(props.success ? '/dashboard': '/');
    }, [time]);

    return (
        <div className="container-narrow payment">
            <h1>{props.success ? 'Udało się!' : 'Anulowano...'}</h1>
            <p>
                {props.success ? 'Twoja subskrypcja została opłacona.' : 'Anulowałeś opłacenie subskrypcji.'}
            </p>
            <p className="color-primary-dark-1">Za {time} sekund zostaniesz przekierowany na stronę główną</p>
        </div>
    )
}

export default PaymentMessage;