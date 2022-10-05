import { useSelector } from 'react-redux';

const UserInfoPanel = () => {
    const { name, email } = useSelector(state => state.user);

    return (
        <section id="panel-user-info">
            <h2 className="mb-3">Dane kontaktowe</h2>
            <ul className="list-text-standard">
                <li>
                    <span className="bold">Imię:&nbsp;</span> {name}
                </li>
                <li>
                    <span className="bold">Email:&nbsp;</span> {email}
                </li>
                <li>
                    Komunikaty związane z Twoją subskrypcją będziemy wysłać na
                    tego maila.
                </li>
            </ul>
        </section>
    );
};

export default UserInfoPanel;
