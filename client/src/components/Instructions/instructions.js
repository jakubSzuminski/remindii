export default function Instructions() {
    const manageBox = (boxId) => {
        const el = document.getElementById(boxId);
        
        if(el.classList.contains('instructions-box-show')) {
            el.classList.remove('instructions-box-show');
            el.classList.add('instructions-box-hide');
        } else {
            el.classList.remove('instructions-box-hide');
            el.classList.add('instructions-box-show');
        }
    }

    return (
        <section id="instructions-page">
            <div className="container flex space-between gap-8">
                <div className="instructions">
                    <h1 className="mb-2">Instrukcje</h1>
                    
                    <button className="instructions-button" onClick={() => manageBox('instructions-subscription')}>Subskrypcja</button>
                    <div className="instructions-box" id="instructions-subscription">
                        <div className="instructions-box-content">
                        <p className="mb-2">
                            W zakładce <i>Twój Panel</i> możesz zobaczyć wszystko co dzieje się z Twoją subskrypcją
                        </p>
                        <ul>
                            <li>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                czy subskrypcja jest aktywna? do kiedy jest ważna?
                            </li>
                            
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                możesz przejść do panelu zarządzania subskrypcją i zmienić pakiet lub anulować subskrypcję
                            </li>

                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                możesz zobaczyć wszystkie faktury i historię opłat
                            </li>
                            
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                kiedy będziesz zbliżał się do limitu smsów w danym miesiącu, powiadomimy Cię mailem
                            </li>
                            
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                wszystkie płatności obsługiwane są przez platformę Stripe
                            </li>
                        </ul>
                        </div>
                    </div>

                    <button className="instructions-button" onClick={() => manageBox('instructions-message')}>Treść wiadomości</button>
                    <div className="instructions-box" id="instructions-message">
                        <div className="instructions-box-content">
                        <p className="mb-2">
                            W zakładce <i>Twój Panel</i> możesz zobaczyć aktualną treść swojej wiadomości
                        </p>
                        <ul>
                            <li>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                musisz ustawić treść swojej wiadomości (dopóki nie ustawisz Twoje smsy przypominające nie będą się wysyłać)
                            </li>
                            
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                Twoja wiadomość musi mieć 20-160 znaków
                            </li>

                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                <span className="bold">
                                    w swojej wiadomości możesz użyć daty spotkania wpisując $!data oraz godzinę spotkania 
                                    używając $!godz - przykładowo: <i>Przypominamy o wizycie umówionej na $!data na godzinę $!godz. </i>
                                    wyśle się jako <i>Przypominamy o wizycie umówionej na 24.08 na 18:30.</i>
                                </span>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <button className="instructions-button" onClick={() => manageBox('instructions-history')}>Dziennik wysłanych wiadomości</button>
                    <div className="instructions-box" id="instructions-history">
                        <div className="instructions-box-content">
                        <p className="mb-2">
                            W zakładce <i>Twój Panel</i> możesz zobaczyć dziennik wszystkich wysłanych wiadomości
                        </p>
                        <ul>
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                dziennik ten resetuje się co miesiąc
                            </li>
                            
                            <li>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                                smsy są wysyłane do wszystkich poprawnie wpisanych numerów z Twoich kalendarzy Google
                            </li>
                        </ul>
                        </div>
                    </div>

                    <p>W przypadku jakichkolwiek pytań nie wahaj się z nami skontaktować (przechodząc do zakładki Kontakt)</p>
                </div>  

                <div className="instructions-info">
                    <ul className="color-primary-dark-2">
                        <li> Twoje wiadomości wysyłają się o 10, dzień przed spotkaniem. </li>
                        <li> Wysyłają się wiadomości o treści podanej w zakładce "Twój Panel".</li>
                        <li> 
                            Wydarzenia czytane są z Twojego kalendarza Google - aby wiadomość wysłała się w pierwszej linijce 
                            wydarzenia musi być podany numer telefonu klienta (bez formatowania - pogrubienia, kursywy)!
                        </li>
                        <li> 
                            Historię wszystkich wysłanych wiadomości możesz zobaczyć w zakładce "Twój Panel" pod hasłem <i>Dziennik. </i>
                            Historia ta resetowana jest po miesiącu.
                        </li>
                    </ul>
                    
                </div>
            </div>
        </section>
    )
}