import { useSelector } from 'react-redux';

const Log = () => {
    const { log } = useSelector(state => state.user);

    return (
        <section id="log-page">
            <div className='container'>
                <h1>Dziennik</h1>
                <p className="mb-3">wysłane wiadomości przez ostatni okres subskrypcji</p>
                <ul className="log-list">
                    { log.map((item, index) => (
                        <li key={index}>{item.date} - {item.to}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Log;