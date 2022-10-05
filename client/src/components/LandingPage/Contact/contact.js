import { Fade } from 'react-awesome-reveal';

export default function Contact() {
    return (
        <Fade>
        <section id="contact">
            <div className="container">
                <h2 className="mb-2">Kontakt</h2>
                <p className="big mb-4">Nie wahaj się z nami skontaktować! Chętnie odpowiemy na dowolne pytanie.</p>
                
                <ul className="contact-options">
                        <li>
                            <a href="https://www.facebook.com/remindii" target="_blank">
                                <ion-icon name="chatbubble-outline"></ion-icon>
                                napisz przez Messengera
                            </a>
                        </li>

                        <li>
                            <a href="mailto:kontakt@remindii.pl">
                                <ion-icon name="mail-unread-outline"></ion-icon>    
                                wyślij maila na kontakt@remindii.pl
                            </a>
                        </li>
                </ul>
            </div>
        </section>
        </Fade>
    )
}