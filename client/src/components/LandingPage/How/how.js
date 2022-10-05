import { Fade } from 'react-awesome-reveal';

export default function How() {
    return (
        <section id="howitworks">
            <div className="container">
                <h2 className="special mb-6">
                    <span>jak to działa</span>
                    <span>To banalnie proste</span>
                </h2>

                <div className="steps mb-7">
                    <Fade>
                    <div className="step">
                        <div className="step-text">
                            <p className="step-num">1</p>
                            <h3 className="step-title">Zaloguj się przez Google</h3>
                            <p className="step-subtitle">
                                proste logowanie z udzieleniem dostępu do czytania wydarzeń z kalendarza
                            </p>
                        </div>
                        <div className="step-image">
                            <img src="visuals/gifs/login_with_google.gif" alt="Zaloguj sie przez Google"/>
                        </div>
                    </div>
                    </Fade>

                    <Fade>
                    <div className="step step-right">
                        <div className="step-image">
                            <img src="visuals/gifs/choose_package.gif" alt="Wybierz swój pakiet w zależności od ilości umawianych wizyt"/>
                        </div>

                        <div className="step-text">
                            <p className="step-num">2</p>
                            <h3 className="step-title">Wybierz swoją subskrypcję</h3>
                            <p className="step-subtitle">
                                wybierasz jeden z pakietów, który Ciebie dotyczy (na podstawie maksymalnej miesięcznej liczby wizyt/smsów)
                            </p>
                        </div>
                    </div>
                    </Fade>

                    <Fade>
                    <div className="step">
                        <div className="step-text">
                            <p className="step-num">3</p>
                            <h3 className="step-title">Dodajesz treść swojego SMSa</h3>
                            <p className="step-subtitle">
                                przypominasz klientowi o wizycie, możesz poprosić o potwierdzenie wizyty, możesz ułatwić mu dotarcie do Ciebie 
                                poprzez podanie adresu;
                                <br></br><br></br>
                                możesz w treści SMSa użyć daty i godziny wizyty za pomocą specjalnych tagów
                            </p>
                        </div>
                        <div className="step-image">
                            <img src="visuals/gifs/set_message.gif" alt="Ustaw swoja tresc wiadomosci"/>
                        </div>
                    </div>
                    </Fade>

                    <Fade>
                    <div className="step step-right">
                        <div className="step-image">
                            <img src="visuals/gifs/add_calendar_event.gif" alt="Dodaj wydarzenie do kalendarza Google z numerem telefonu w opisie"/>
                        </div>

                        <div className="step-text">
                            <p className="step-num">4</p>
                            <h3 className="step-title">Dodajesz wizytę do kalendarza Google</h3>
                            <p className="step-subtitle">
                                do każdej wizyty wpisujesz numer telefonu klienta w pierwszej linii opisu wydarzenia; 
                                SMS przypominający wysyłamy na numery z opisów wydarzeń
                            </p>
                        </div>
                    </div>
                    </Fade>
                </div>

                <div className="center">
                    <h3 className="color-primary center mb-2">Gratulacje!</h3>
                    <p className="center big bold">
                        Twoi klienci będą dostawać powiadomienie SMS dzień przed umówioną z Tobą wizytą!
                    </p>
                </div>
            </div>
            
        </section>
    );
}