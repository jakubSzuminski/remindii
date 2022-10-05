import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserLog } from '../../../actions/user';
import routes from '../../../constants/routes';

const LogPanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { log } = useSelector(state => state.user);

    const showHistory = async () => {
        dispatch(getUserLog());
        navigate(routes.dashboard_log);
    }

    return (
        <section id="panel-log">
            <div>
                <h2 className="mb-3">Dziennik</h2>
                
                {log.length > 0 ? (
                    <>
                    <ul className="panel-log-list mb-2">
                        {log.splice(0, 4).map((item, index) => (
                            <li key={index}>
                                {item.date} - {item.to} - wysłane
                            </li>
                        ))}
                    </ul>
                    {log.length > 4 && (<button className="no-outline center color-gray underline" onClick={showHistory}>Zobacz cały dziennik</button>)}
                    </>
                ) : (
                    <p>Nie wysłano na razie żadnych wiadomości.</p>
                )}
                
            </div>
        </section>
    );
};

export default LogPanel;