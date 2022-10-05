export default function Contact() {
    return (
        <section id="contact-page">
            <div className="container">
                <h1 className="mb-2">Kontakt</h1>
                <p className="mb-2">Nie wahaj się z nami skontaktować! Chętnie odpowiemy na dowolne pytanie</p>

                <ul className="contact-block">
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
    )
}